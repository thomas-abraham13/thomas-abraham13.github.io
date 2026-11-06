import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { ANALYTICS_CONSENT_KEY } from './utils/analytics';
import { DARK_MODE_STORAGE_KEY } from './hooks/useDarkMode';
import routes from './profile/routes.json';
import home from './profile/home.json';
import projects from './profile/projects.json';

const renderAt = (path) => {
  window.history.pushState({}, '', path);
  return render(<App />);
};

beforeEach(() => {
  window.localStorage.clear();
  // Skip the consent banner so it does not cover assertions below.
  window.localStorage.setItem(ANALYTICS_CONSENT_KEY, 'denied');
});

test('renders the home page', () => {
  renderAt('/');

  expect(screen.getByRole('heading', { level: 1, name: home.name })).toBeInTheDocument();
});

test.each(routes.sections)('renders the $headerTitle page at $path', async ({ path, headerTitle }) => {
  renderAt(path);

  expect(await screen.findByRole('heading', { level: 1, name: headerTitle }))
    .toBeInTheDocument();
});

test('shows a not-found page for unknown paths', () => {
  renderAt('/does-not-exist');

  expect(screen.getByRole('heading', { level: 1, name: /page not found/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /back to the home page/i })).toHaveAttribute('href', '/');
});

test('stores the visitor analytics preference', () => {
  window.localStorage.removeItem(ANALYTICS_CONSENT_KEY);
  renderAt('/');

  fireEvent.click(screen.getByRole('button', { name: /reject analytics/i }));

  expect(window.localStorage.getItem(ANALYTICS_CONSENT_KEY)).toBe('denied');
  expect(screen.getByRole('button', { name: /analytics settings/i })).toBeInTheDocument();
});

test('toggles and remembers the theme', () => {
  renderAt('/');

  const toggle = screen.getByRole('switch', { name: /dark mode/i });
  expect(toggle).toHaveAttribute('aria-checked', 'true');

  fireEvent.click(toggle);

  expect(toggle).toHaveAttribute('aria-checked', 'false');
  expect(window.localStorage.getItem(DARK_MODE_STORAGE_KEY)).toBe('false');
});

test('reveals the remaining projects on "show more"', async () => {
  renderAt('/projects');
  const lastProject = projects.projects[projects.projects.length - 1].title;

  await screen.findByRole('heading', { level: 1, name: 'Projects' });

  if (projects.projects.length <= 6) {
    expect(screen.queryByRole('button', { name: /show more/i })).not.toBeInTheDocument();
    return;
  }

  expect(screen.queryByText(lastProject)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /show more/i }));
  expect(screen.getByText(lastProject)).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /show more/i })).not.toBeInTheDocument();
});
