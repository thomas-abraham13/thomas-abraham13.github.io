import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import useDarkMode from 'use-dark-mode';
import ReactGA from 'react-ga4';
import AppContext from './AppContext';
import MainApp from './MainApp';
import GlobalStyles from './theme/GlobalStyles';
import { lightTheme, darkTheme } from './theme/themes';

const GA_MEASUREMENT_ID = 'G-1GRG57RS6J';

function App() {
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize(GA_MEASUREMENT_ID);
    }
  }, []);

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
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
