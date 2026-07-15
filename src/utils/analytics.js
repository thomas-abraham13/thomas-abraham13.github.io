import ReactGA from 'react-ga4';

export const ANALYTICS_CONSENT_KEY = 'portfolio-analytics-consent';

const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

let analyticsInitialized = false;
let analyticsEnabled = false;

const canUseAnalytics = () => (
  process.env.NODE_ENV === 'production' && Boolean(GA_MEASUREMENT_ID)
);

const googleConsentSettings = (analyticsStorage) => ({
  analytics_storage: analyticsStorage,
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
});

const clearAnalyticsCookies = () => {
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.trim().split('=')[0];

    if (name === '_ga' || name.startsWith('_ga_')) {
      const expiredCookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      document.cookie = expiredCookie;
      document.cookie = `${expiredCookie}; domain=${window.location.hostname}`;
    }
  });
};

export const getAnalyticsConsent = () => {
  try {
    const consent = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return consent === 'granted' || consent === 'denied' ? consent : null;
  } catch (error) {
    return null;
  }
};

export const setAnalyticsConsent = (consent) => {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, consent);
  } catch (error) {
    // A blocked localStorage should not prevent the visitor using the site.
  }
};

export const initializeAnalytics = () => {
  if (!canUseAnalytics()) {
    return false;
  }

  window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;

  if (!analyticsInitialized) {
    ReactGA.gtag(
      'consent',
      'default',
      googleConsentSettings('granted'),
    );
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      gaOptions: {
        allowAdFeatures: false,
        allowAdPersonalizationSignals: false,
      },
    });
    analyticsInitialized = true;
  } else {
    ReactGA.gtag(
      'consent',
      'update',
      googleConsentSettings('granted'),
    );
  }

  analyticsEnabled = true;
  return true;
};

export const disableAnalytics = () => {
  analyticsEnabled = false;

  if (!canUseAnalytics()) {
    return;
  }

  window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;

  if (analyticsInitialized) {
    ReactGA.gtag(
      'consent',
      'update',
      googleConsentSettings('denied'),
    );
    clearAnalyticsCookies();
  }
};

export const trackEvent = (eventName, parameters = {}) => {
  if (analyticsEnabled && analyticsInitialized) {
    ReactGA.event(eventName, parameters);
  }
};

export const reportWebVital = (metric) => {
  trackEvent(metric.name, {
    value: metric.delta,
    metric_id: metric.id,
    metric_value: metric.value,
    metric_delta: metric.delta,
    metric_rating: metric.rating,
    navigation_type: metric.navigationType,
    non_interaction: true,
  });
};
