const ABSOLUTE_URL_PATTERN = /^(?:[a-z][a-z\d+\-.]*:|\/\/)/i;

export const resolvePublicPath = (path) => {
  if (!path || ABSOLUTE_URL_PATTERN.test(path)) {
    return path;
  }

  const publicUrl = process.env.PUBLIC_URL || '';
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${publicUrl}${normalizedPath}`;
};

export const loadJson = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status}`);
  }

  return response.json();
};
