import React, { useEffect, useState, useContext } from 'react';
import { Chrono } from 'react-chrono';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import useProfileJson from '../hooks/useProfileJson';
import { resolvePublicPath } from '../utils/data';
import '../css/education.css';

const getTimelineLayout = () => {
  const viewportWidth = window.innerWidth;

  if (viewportWidth < 768) {
    return {
      mode: 'VERTICAL',
      width: '90vw',
    };
  }

  if (viewportWidth < 1024) {
    return {
      mode: 'VERTICAL_ALTERNATING',
      width: '75vw',
    };
  }

  return {
    mode: 'VERTICAL_ALTERNATING',
    width: '50vw',
  };
};

function Education(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const data = useProfileJson(endpoints.education);
  const [width, setWidth] = useState('50vw');
  const [mode, setMode] = useState('VERTICAL_ALTERNATING');

  useEffect(() => {
    const updateLayout = () => {
      const nextLayout = getTimelineLayout();

      setMode(nextLayout.mode);
      setWidth(nextLayout.width);
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);

    return () => {
      window.removeEventListener('resize', updateLayout);
    };
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade>
          <div style={{ width }} className="section-content-container">
            <Container>
              <Chrono
                hideControls
                allowDynamicUpdate
                useReadMore={false}
                items={data.education}
                cardHeight={250}
                mode={mode}
                theme={{
                  primary: theme.accentColor,
                  secondary: theme.accentColor,
                  cardBgColor: theme.chronoTheme.cardBgColor,
                  cardForeColor: theme.chronoTheme.cardForeColor,
                  titleColor: theme.chronoTheme.titleColor,
                }}
              >
                <div className="chrono-icons">
                  {data.education.map((education) => (education.icon ? (
                    <img
                      key={education.icon.src}
                      src={resolvePublicPath(education.icon.src)}
                      alt={education.icon.alt}
                    />
                  ) : null))}
                </div>
              </Chrono>
            </Container>
          </div>
        </Fade>
      ) : <FallbackSpinner /> }
    </>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
