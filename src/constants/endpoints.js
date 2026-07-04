import { resolvePublicPath } from '../utils/data';

const profileEndpoint = (filename) => resolvePublicPath(`profile/${filename}`);

const endpoints = {
  navbar: profileEndpoint('navbar.json'),
  routes: profileEndpoint('routes.json'),
  home: profileEndpoint('home.json'),
  social: profileEndpoint('social.json'),
  about: profileEndpoint('about.json'),
  skills: profileEndpoint('skills.json'),
  education: profileEndpoint('education.json'),
  experiences: profileEndpoint('experiences.json'),
  projects: profileEndpoint('projects.json'),
};

export default endpoints;
