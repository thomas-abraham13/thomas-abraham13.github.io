import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Header from './Header';
import Reveal from './Reveal';
import data from '../profile/experiences.json';
import '../css/experience.css';

function Experience({ header }) {
  const theme = useContext(ThemeContext);
  const timelineStyle = {
    '--experience-accent': theme.accentColor,
    '--experience-line': theme.timelineLineColor,
    '--experience-background': theme.background,
  };

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          <ol className="experience-timeline" style={timelineStyle}>
            {data.experiences.map((item) => (
              <li key={item.title + item.dateText} className="experience-item">
                <Reveal className="experience-item__layout">
                  <p className="experience-item__date">{item.dateText}</p>
                  <span className="experience-item__marker" aria-hidden="true" />
                  <div className="experience-item__body">
                    <h2 className="item-title">{item.title}</h2>
                    <p className="experience-item__subtitle">
                      <span className="experience-item__company">{item.subtitle}</span>
                      {item.workType && (
                        <span className="experience-item__work-type">
                          {' '}
                          &middot;
                          {' '}
                          {item.workType}
                        </span>
                      )}
                    </p>
                    <ul className="experience-item__points">
                      {item.workDescription.map((point) => (
                        <li key={point}>
                          <Markdown components={{ p: 'span' }}>{point}</Markdown>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </div>
    </>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;
