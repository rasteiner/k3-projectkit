const path = require('path');
const fs = require('fs');

//watch css
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const chokidar = require('chokidar');

const watcher = chokidar.watch(path.resolve(__dirname, '../src/css/tailwind.css'), {
  ignored: /(^|[\/\\])\../,
  persistent: true,
});

watcher.on('change', (fp) => {
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
    fs.readFileSync(fp, 'utf-8'),
    {
      from: fp,
      to: fp.replace('/src/css/', '/www/assets/css/'),
    },
  ).then((result) => {
    fs.mkdirSync(path.resolve(__dirname, '../www/assets/css'), { recursive: true });
    fs.writeFileSync(fp.replace('/src/css/', '/www/assets/css/'), result.css);
  }).catch(console.error);
});


//esbuild watch
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
  watch: true,
}).catch(console.error);
