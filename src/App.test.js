import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

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
