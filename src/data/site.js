export const SITE = {
  name: 'Kim Phong',
  // The CV uses the full name.
  fullName: 'Do Kim Phong',
  email: 'phongkimdo2910@gmail.com',
  github: 'https://github.com/kpdo2910',
  linkedin: 'https://www.linkedin.com/in/phong-kim-do/',
  repo: 'https://github.com/kpdo2910/kpdo2910.github.io',
  // The "Download CV" button on the About page. /cv.pdf, /ja/cv.pdf and /vi/cv.pdf are printed
  // from the /cv/ pages by integrations/cv-pdf.js (when building, and on request under
  // `astro dev`). Set to null to hide the button.
  cv: '/cv.pdf',
};

export const NAV = [
  { key: 'home', path: '/', icon: 'home' },
  { key: 'projects', path: '/projects/', icon: 'briefcase' },
  { key: 'blog', path: '/blog/', icon: 'file' },
  { key: 'about', path: '/about/', icon: 'user' },
];

// Filter chips on the blog page. A topic only appears once a post uses it.
// Set to null to offer every tag instead.
export const BLOG_TOPICS = ['flutter', 'ios', 'tooling', 'backend'];
