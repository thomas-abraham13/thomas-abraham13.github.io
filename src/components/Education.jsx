import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Header from './Header';
import Reveal from './Reveal';
import data from '../profile/education.json';
import { resolvePublicPath } from '../utils/data';
import '../css/education.css';

function Education({ header }) {
  const theme = useContext(ThemeContext);
  const timelineStyle = {
    '--education-card-bg': theme.educationTheme.cardBgColor,
    '--education-card-text': theme.educationTheme.cardForeColor,
    '--education-title-text': theme.educationTheme.titleColor,
    '--education-line-color': theme.educationTheme.markerColor,
    '--education-active-marker': theme.educationTheme.markerColorActive,
    '--education-active-marker-text': theme.educationTheme.markerTextActive,
    '--education-page-bg': theme.background,
  };

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          <ol className="education-timeline" style={timelineStyle}>
            {data.education.map((education) => (
              <li key={education.title} className="education-item">
                <Reveal className="education-item__layout">
                  <div className="education-item__card">
                    <h2 className="education-item__title">{education.cardTitle}</h2>
                    <p className="education-item__subtitle">{education.cardSubtitle}</p>
                    {education.cardDetailedText && (
                      <p className="education-item__text">{education.cardDetailedText}</p>
                    )}
                  </div>
                  <span className="education-item__marker">
                    {education.icon && (
                      <img
                        src={resolvePublicPath(education.icon.src)}
                        alt={`${education.cardSubtitle} logo`}
                        width={28}
                        height={28}
                      />
                    )}
                  </span>
                  <p className="education-item__date">{education.title}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </div>
    </>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
