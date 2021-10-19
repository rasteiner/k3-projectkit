const path = require('path');
const fs = require('fs');

//build js
require('esbuild').build({
  entryPoints: [
    path.resolve(__dirname, '../src/js/main.js'),
  ],
  bundle: true,
  outfile: path.resolve(__dirname, '../www/assets/js/main.js'),
  minify: true,
  target: 'es2018',
  format: 'iife',
  sourcemap: true,
}).catch(console.error);

//postcss build
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

postcss([
  tailwindcss(path.resolve(__dirname, '../tailwind.config.js')),
  autoprefixer,
  cssnano({
    preset: ['default', {
      discardComments: {
        removeAll: true,
      },
    }],
  }),
]).process(
  fs.readFileSync(path.resolve(__dirname, '../src/css/tailwind.css'), 'utf-8'),
  {
    from: path.resolve(__dirname, '../src/css/tailwind.css'),
    to: path.resolve(__dirname, '../www/assets/css/tailwind.css'),
  },
).then((result) => {
  fs.mkdirSync(path.resolve(__dirname, '../www/assets/css'), { recursive: true });
  fs.writeFileSync(path.resolve(__dirname, '../www/assets/css/tailwind.css'), result.css);
}).catch(console.error);

