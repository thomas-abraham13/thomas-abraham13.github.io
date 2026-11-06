import { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../AppContext';
import { trackEvent } from '../utils/analytics';

function ThemeToggler({ onClick = () => {} }) {
  const { darkMode } = useContext(AppContext);

  const handleClick = () => {
    trackEvent('theme_change', {
      theme: darkMode.value ? 'light' : 'dark',
    });
    darkMode.toggle();
    onClick();
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={darkMode.value}
      aria-label="Dark mode"
      title={darkMode.value ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`theme-toggle${darkMode.value ? ' theme-toggle--dark' : ''}`}
      onClick={handleClick}
    >
      <span className="theme-toggle__thumb" aria-hidden="true" />
    </button>
  );
}

ThemeToggler.propTypes = {
  onClick: PropTypes.func,
};

export default ThemeToggler;
