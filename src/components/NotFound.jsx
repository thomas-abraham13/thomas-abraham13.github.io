import { useContext } from 'react';
import { Link } from 'react-router';
import { ThemeContext } from 'styled-components';
import Header from './Header';

function NotFound() {
  const theme = useContext(ThemeContext);

  return (
    <>
      <Header title="Page not found" />
      <div className="section-content-container">
        <p>The page you were looking for doesn&apos;t exist.</p>
        <Link to="/" style={{ color: theme.accentColor }}>
          Back to the home page
        </Link>
      </div>
    </>
  );
}

export default NotFound;
