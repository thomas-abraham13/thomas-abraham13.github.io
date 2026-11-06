import {
  useCallback, useEffect, useMemo, useState,
} from 'react';

// Same key and value format the previous use-dark-mode package wrote, so
// returning visitors keep their saved theme.
export const DARK_MODE_STORAGE_KEY = 'darkMode';

const readStoredPreference = (fallback) => {
  try {
    const stored = window.localStorage.getItem(DARK_MODE_STORAGE_KEY);

    if (stored === 'true') return true;
    if (stored === 'false') return false;
  } catch {
    // Blocked storage falls back to the default theme.
  }

  return fallback;
};

function useDarkMode(defaultValue) {
  const [value, setValue] = useState(() => readStoredPreference(defaultValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(DARK_MODE_STORAGE_KEY, String(value));
    } catch {
      // The theme still applies for this visit without storage.
    }

    document.body.classList.toggle('dark-mode', value);
    document.body.classList.toggle('light-mode', !value);
    document.documentElement.style.colorScheme = value ? 'dark' : 'light';
  }, [value]);

  const toggle = useCallback(() => setValue((current) => !current), []);

  return useMemo(() => ({ value, toggle }), [value, toggle]);
}

export default useDarkMode;
