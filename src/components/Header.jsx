import PropTypes from 'prop-types';

function Header({ title }) {
  return <h1 className="header">{title}</h1>;
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
