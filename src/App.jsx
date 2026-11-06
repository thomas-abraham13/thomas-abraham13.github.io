import { useEffect, useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import AppContext from './AppContext';
import MainApp from './MainApp';
import AnalyticsConsent from './components/AnalyticsConsent';
import useDarkMode from './hooks/useDarkMode';
import GlobalStyles from './theme/GlobalStyles';
import { lightTheme, darkTheme } from './theme/themes';
import {
  disableAnalytics,
  getAnalyticsConsent,
  initializeAnalytics,
  setAnalyticsConsent,
} from './utils/analytics';

function App() {
  const [analyticsConsent, setConsent] = useState(getAnalyticsConsent);
  const darkMode = useDarkMode(true);
  const appContextValue = useMemo(() => ({ darkMode }), [darkMode]);

  useEffect(() => {
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

  return (
    <AppContext.Provider value={appContextValue}>
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
