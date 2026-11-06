const ABSOLUTE_URL_PATTERN = /^(?:[a-z][a-z\d+\-.]*:|\/\/)/i;

// Resolves a path from the profile JSON (e.g. "images/logo.webp") against the
// site's base URL, leaving absolute URLs untouched.
// eslint-disable-next-line import/prefer-default-export
export const resolvePublicPath = (path) => {
  if (!path || ABSOLUTE_URL_PATTERN.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  return `${base}/${path.replace(/^\//, '')}`;
};
