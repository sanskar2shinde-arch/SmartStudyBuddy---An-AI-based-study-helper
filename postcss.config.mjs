/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // This replaces require('tailwindcss')
    '@tailwindcss/postcss': {},
    // Autoprefixer is often built into the new engine, 
    // but keeping it here ensures maximum browser compatibility
    'autoprefixer': {},
    
  },
};

export default config;