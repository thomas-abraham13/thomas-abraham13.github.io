import React, { useContext } from 'react';
import DarkModeToggle from 'react-dark-mode-toggle';
import PropTypes from 'prop-types';
import AppContext from '../AppContext';
import { trackEvent } from '../utils/analytics';

function ThemeToggler(props) {
  const { onClick } = props;
  const { darkMode } = useContext(AppContext);

  const handleOnChange = () => {
    trackEvent('theme_change', {
      theme: darkMode.value ? 'light' : 'dark',
    });
    darkMode.toggle();
    onClick();
  };

  return (
    <div style={{ marginBottom: 8 }}>
      <DarkModeToggle
        onChange={handleOnChange}
        checked={darkMode.value}
        size={50}
      />
    </div>
  );
}

ThemeToggler.propTypes = {
  onClick: PropTypes.func,
};
ThemeToggler.defaultProps = {
  onClick: () => {},
};

export default ThemeToggler;
