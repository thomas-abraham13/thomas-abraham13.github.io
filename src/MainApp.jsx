import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';
import FallbackSpinner from './components/FallbackSpinner';
import NavBar from './components/NavBar';
import Home from './components/Home';
import NotFound from './components/NotFound';
import routes from './profile/routes.json';

export const sectionComponents = {
  About: lazy(() => import('./components/About')),
  Skills: lazy(() => import('./components/Skills')),
  Education: lazy(() => import('./components/Education')),
  Experience: lazy(() => import('./components/Experience')),
  Projects: lazy(() => import('./components/Projects')),
  Resume: lazy(() => import('./components/Resume')),
};

function MainApp() {
  return (
    <div className="MainApp">
      <NavBar />
      <main className="main">
        <Suspense fallback={<FallbackSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {routes.sections.map((route) => {
              const SectionComponent = sectionComponents[route.component];

              if (!SectionComponent) {
                return null;
              }

              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<SectionComponent header={route.headerTitle} />}
                />
              );
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default MainApp;
