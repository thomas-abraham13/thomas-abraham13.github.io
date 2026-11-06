import { useState, useContext } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import Header from './Header';
import Reveal from './Reveal';
import ProjectCard from './projects/ProjectCard';
import data from '../profile/projects.json';

const INITIAL_PROJECT_COUNT = 6;

const styles = {
  containerStyle: {
    marginBottom: 25,
  },
  showMoreStyle: {
    margin: 25,
  },
};

function Projects({ header }) {
  const theme = useContext(ThemeContext);
  const [showMore, setShowMore] = useState(false);
  const { projects } = data;
  const hasHiddenProjects = !showMore && projects.length > INITIAL_PROJECT_COUNT;
  const visibleProjects = showMore ? projects : projects.slice(0, INITIAL_PROJECT_COUNT);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container style={styles.containerStyle}>
          <Row xs={1} sm={1} md={2} lg={3} className="g-4">
            {visibleProjects.map((project) => (
              <Reveal key={project.title}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </Row>

          {hasHiddenProjects && (
            <Button
              style={styles.showMoreStyle}
              variant={theme.bsSecondaryVariant}
              onClick={() => setShowMore(true)}
            >
              show more
            </Button>
          )}
        </Container>
      </div>
    </>
  );
}

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;
