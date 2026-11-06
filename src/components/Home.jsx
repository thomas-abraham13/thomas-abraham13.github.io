import Typewriter from 'typewriter-effect';
import Reveal from './Reveal';
import Social from './Social';
import data from '../profile/home.json';

const styles = {
  nameStyle: {
    fontSize: '5em',
  },
  inlineChild: {
    display: 'inline-block',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function Home() {
  return (
    <Reveal>
      <div className="home-container" style={styles.mainContainer}>
        <h1 style={styles.nameStyle}>{data.name}</h1>
        <div>
          <h2 style={styles.inlineChild}>I&apos;m&nbsp;</h2>
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: data.roles,
            }}
          />
        </div>
        <Social />
      </div>
    </Reveal>
  );
}

export default Home;
