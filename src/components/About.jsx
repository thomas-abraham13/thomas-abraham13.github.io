import Markdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from './Header';
import Reveal from './Reveal';
import data from '../profile/about.json';
import { resolvePublicPath } from '../utils/data';

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  introImage: {
    width: '100%',
    maxWidth: 360,
    height: 'auto',
    borderRadius: 8,
  },
};

function About({ header }) {
  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          <Reveal>
            <Row>
              <Col style={styles.introTextContainer}>
                <Markdown>{data.about}</Markdown>
              </Col>
              <Col style={styles.introImageContainer}>
                <img
                  src={resolvePublicPath(data.imageSource)}
                  alt={data.imageAlt}
                  width={605}
                  height={703}
                  style={styles.introImage}
                />
              </Col>
            </Row>
          </Reveal>
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
