import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import useDarkMode from 'use-dark-mode';
import AppContext from './AppContext';
import MainApp from './MainApp';
import AnalyticsConsent from './components/AnalyticsConsent';
import GlobalStyles from './theme/GlobalStyles';
import { lightTheme, darkTheme } from './theme/themes';
import {
  disableAnalytics,
  getAnalyticsConsent,
  initializeAnalytics,
  setAnalyticsConsent,
} from './utils/analytics';

function App() {
  const [analyticsConsent, setConsent] = React.useState(getAnalyticsConsent);

  React.useEffect(() => {
    if (analyticsConsent === 'granted') {
      initializeAnalytics();
    } else {
      disableAnalytics();
    }
  }, [analyticsConsent]);

  const handleAnalyticsConsent = (consent) => {
    setAnalyticsConsent(consent);
    setConsent(consent);
  };

  const darkMode = useDarkMode(true, {
    global: window,
  });

  return (
    <AppContext.Provider value={{ darkMode }}>
      <ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
        <GlobalStyles />
        <div className="App">
          <BrowserRouter>
            <MainApp />
          </BrowserRouter>
          <AnalyticsConsent
            consent={analyticsConsent}
            onChange={handleAnalyticsConsent}
          />
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
