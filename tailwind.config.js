


module.exports = {
  purge: [
    './www/site/templates/**/*.php',
    './www/site/snippets/**/*.php',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
  },
  variants: {
    extend: {},
  },
  plugins: [
  ],
}
