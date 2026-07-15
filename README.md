# Thomas Abraham's Portfolio

A website detailing some of my previous work which can act as a dynamic portfolio and resume.


## Domain : [thomas-abraham13.github.io](https://thomas-abraham13.github.io)

## Analytics

Google Analytics loads only in production and only after the visitor allows
analytics. Set `REACT_APP_GA_MEASUREMENT_ID` in the production environment; the
current GitHub Pages value is stored in `.env.production`.

GA4 Enhanced Measurement is responsible for page views. In the GA4 web data
stream, enable **Enhanced measurement > Page views > Page changes based on
browser history events** so React Router navigation is counted without adding
duplicate manual page-view events.

The app also records consented resume, documentation, social, project-link, and
theme interactions. Web performance is reported through `CLS`, `INP`, `LCP`,
`FCP`, and `TTFB` events using GA4's recommended metric parameters.
