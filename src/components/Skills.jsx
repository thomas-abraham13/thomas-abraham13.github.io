import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Reveal from './Reveal';
import data from '../profile/skills.json';
import { resolvePublicPath } from '../utils/data';

const styles = {
  iconStyle: {
    height: 75,
    width: 75,
    objectFit: 'contain',
    margin: 10,
    marginBottom: 0,
  },
  introTextContainer: {
    whiteSpace: 'pre-wrap',
  },
  skillItem: {
    display: 'inline-block',
  },
};

function Skills({ header }) {
  return (
    <>
      <Header title={header} />
      <Reveal>
        <div className="section-content-container">
          <Container>
            <h2 className="h4" style={styles.introTextContainer}>
              <Markdown components={{ p: 'span' }}>{data.intro}</Markdown>
            </h2>
            {data.skills.map((group) => (
              <div key={group.title}>
                <br />
                <h3>{group.title}</h3>
                {group.items.map((item) => (
                  <div key={item.title} style={styles.skillItem}>
                    <img
                      style={styles.iconStyle}
                      src={resolvePublicPath(item.icon)}
                      alt=""
                      width={75}
                      height={75}
                      loading="lazy"
                    />
                    <p>{item.title}</p>
                  </div>
                ))}
              </div>
            ))}
          </Container>
        </div>
      </Reveal>
    </>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
