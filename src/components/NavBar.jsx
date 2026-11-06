import { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router';
import styled from 'styled-components';
import ThemeToggler from './ThemeToggler';
import data from '../profile/navbar.json';
import { resolvePublicPath } from '../utils/data';
import { trackEvent } from '../utils/analytics';

const styles = {
  logoStyle: {
    width: 50,
    height: 40,
  },
};

const externalNavigationEvents = {
  Resume: 'resume_click',
  Documentation: 'documentation_click',
};

const ExternalNavLink = styled.a`
  color: ${(props) => props.theme.navbarTheme.linkColor};
  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
  }
  &::after {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

const InternalNavLink = styled(NavLink)`
  color: ${(props) => props.theme.navbarTheme.linkColor};
  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
  }
  &::after {
    background-color: ${(props) => props.theme.accentColor};
  }
  &.active {
    color: ${(props) => props.theme.navbarTheme.linkActiveColor};
  }
`;

function NavBar() {
  const [expanded, setExpanded] = useState(false);

  const handleExternalLinkClick = (section) => {
    trackEvent(
      externalNavigationEvents[section.title] || 'external_navigation_click',
      {
        link_name: section.title,
        link_url: section.href,
      },
    );
    setExpanded(false);
  };

  return (
    <Navbar
      fixed="top"
      expand="md"
      bg="dark"
      variant="dark"
      className="navbar-custom"
      expanded={expanded}
    >
      <Container>
        {data?.logo && (
          <Navbar.Brand
            as={NavLink}
            to="/"
            onClick={() => setExpanded(false)}
          >
            <img
              src={resolvePublicPath(data.logo.source)}
              className="d-inline-block align-top"
              alt="Thomas Abraham home"
              style={
                data.logo.height && data.logo.width
                  ? { height: data.logo.height, width: data.logo.width }
                  : styles.logoStyle
              }
            />
          </Navbar.Brand>
        )}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          aria-label="Toggle navigation"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav>
            {data.sections.map((section, index) => (section.type === 'link' ? (
              <ExternalNavLink
                key={section.title}
                href={resolvePublicPath(section.href)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleExternalLinkClick(section)}
                className="navbar__link"
              >
                {section.title}
              </ExternalNavLink>
            ) : (
              <InternalNavLink
                key={section.title}
                onClick={() => setExpanded(false)}
                end={index === 0}
                className="navbar__link"
                to={section.href}
              >
                {section.title}
              </InternalNavLink>
            )))}
          </Nav>
          <ThemeToggler
            onClick={() => setExpanded(false)}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
