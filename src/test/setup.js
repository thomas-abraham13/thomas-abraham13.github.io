import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

const createMatchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: createMatchMedia,
});

// jsdom has no layout engine, so these browser APIs used by third-party
// components need lightweight stand-ins.
window.ResizeObserver = window.ResizeObserver || function ResizeObserverStub() {
  return { observe: () => {}, unobserve: () => {}, disconnect: () => {} };
};
window.scrollTo = () => {};
Element.prototype.scrollIntoView = Element.prototype.scrollIntoView || (() => {});
