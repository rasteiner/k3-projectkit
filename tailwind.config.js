const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  experimental: {
    optimizeUniversalDefaults: true
  },
  content: [
    './src/**/*.vue',
    './src/js/**/*.ts',
    './www/site/snippets/**/*.php',
    './www/site/templates/**/*.php',
  ],
  safelist: [
    {
      
    }
  ],
  theme: {
    
  },
  corePlugins: {
    //preflight: false,
  },
  /*
  plugins: [
    plugin(({addVariant, e}) => {
      addVariant('sending', ({modifySelectors}) => {
        modifySelectors(({ className }) => `form.sending .${e('sending:' + className)}`)
      });

      addVariant('sent', ({ modifySelectors }) => {
        modifySelectors(({ className }) => `form.sent .${e('sent:' + className)}`)
      });
    })
  ],
  */
}
