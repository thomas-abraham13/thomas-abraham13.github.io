import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import FallbackSpinner from './components/FallbackSpinner';
import NavBar from './components/NavBar';
import Home from './components/Home';
import endpoints from './constants/endpoints';
import useProfileJson from './hooks/useProfileJson';

const sectionComponents = {
  About: React.lazy(() => import('./components/About')),
  Skills: React.lazy(() => import('./components/Skills')),
  Education: React.lazy(() => import('./components/Education')),
  Experience: React.lazy(() => import('./components/Experience')),
  Projects: React.lazy(() => import('./components/Projects')),
};

function MainApp() {
  const data = useProfileJson(endpoints.routes);

  return (
    <div className="MainApp">
      <NavBar />
      <main className="main">
        <Suspense fallback={<FallbackSpinner />}>
          <Switch>
            <Route exact path="/" component={Home} />
            {data
              && data.sections.map((route) => {
                const SectionComponent = sectionComponents[route.component];

                if (!SectionComponent) {
                  return null;
                }

                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    render={() => (
                      <SectionComponent header={route.headerTitle} />
                    )}
                  />
                );
              })}
          </Switch>
        </Suspense>
      </main>
    </div>
  );
}

export default MainApp;
