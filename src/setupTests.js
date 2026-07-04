// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const noop = () => {};

const createMatchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: noop,
  removeListener: noop,
  addEventListener: noop,
  removeEventListener: noop,
  dispatchEvent: noop,
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: createMatchMedia,
});

Object.defineProperty(globalThis, 'matchMedia', {
  writable: true,
  value: window.matchMedia,
});

// react-dark-mode-toggle imports a lottie canvas renderer, but jsdom has no canvas.
HTMLCanvasElement.prototype.getContext = () => ({
  fillRect: noop,
  clearRect: noop,
  getImageData: () => ({ data: [] }),
  putImageData: noop,
  createImageData: () => [],
  setTransform: noop,
  drawImage: noop,
  save: noop,
  fillText: noop,
  restore: noop,
  beginPath: noop,
  moveTo: noop,
  lineTo: noop,
  closePath: noop,
  stroke: noop,
  translate: noop,
  scale: noop,
  rotate: noop,
  arc: noop,
  fill: noop,
  measureText: () => ({ width: 0 }),
  transform: noop,
  rect: noop,
  clip: noop,
});
