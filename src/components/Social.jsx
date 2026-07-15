import React, { useContext } from 'react';
import { SocialIcon } from 'react-social-icons';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import useProfileJson from '../hooks/useProfileJson';
import { trackEvent } from '../utils/analytics';

const styles = {
  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
};

function Social() {
  const theme = useContext(ThemeContext);
  const data = useProfileJson(endpoints.social);

  return (
    <div className="social">
      {data ? data.social.map((social) => (
        <SocialIcon
          key={social.network}
          style={styles.iconStyle}
          url={social.href}
          network={social.network}
          bgColor={theme.socialIconBgColor}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('social_click', {
            social_network: social.network,
            link_url: social.href,
          })}
        />
      )) : null}
    </div>
  );
}

export default Social;
