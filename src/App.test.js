import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { ANALYTICS_CONSENT_KEY } from './utils/analytics';

const responses = {
  '/profile/routes.json': { sections: [] },
  '/profile/navbar.json': { sections: [] },
  '/profile/home.json': {
    name: 'Thomas Abraham',
    roles: ['a QA Analyst'],
  },
  '/profile/social.json': { social: [] },
};

beforeEach(() => {
  window.localStorage.clear();
  global.fetch = jest.fn((url) => Promise.resolve({
    ok: true,
    json: () => Promise.resolve(responses[url] || {}),
  }));
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders portfolio home content', async () => {
  render(<App />);

  expect(await screen.findByText(/thomas abraham/i)).toBeInTheDocument();
});

test('stores the visitor analytics preference', async () => {
  render(<App />);

  await screen.findByText(/thomas abraham/i);
  fireEvent.click(screen.getByRole('button', { name: /reject analytics/i }));

  expect(window.localStorage.getItem(ANALYTICS_CONSENT_KEY)).toBe('denied');
  expect(screen.getByRole('button', { name: /analytics settings/i }))
    .toBeInTheDocument();
});
