const esbuild = require('esbuild');
const path = require('path');
const dev = process.env.NODE_ENV !== 'production';
const glob = require('fast-glob');


const vuePlugin = require('esbuild-plugin-vue3');

const { glsl } = require("esbuild-plugin-glsl");

const postCss = require('postcss');
const postCssConfig = require('../postcss.config.js');

// load postcss plugins and initialize them with their config
const postCssPlugins = Object.entries(postCssConfig.plugins).map(([plugin, config]) => {
  const pluginModule = require(plugin);
  return pluginModule(config);
});

const entryPoints = glob.sync(['src/js/*.ts', '!src/js/*.d.ts', 'src/js/templates/*.ts', '!src/js/templates/*.d.ts'])
  .map(file => path.resolve(__dirname, '../', file));


async function start() {
  const ctx = await esbuild.context({
    entryPoints,
    bundle: true,
    treeShaking: true,
    //splitting: true,
    format: 'iife',
    target: 'es2020',
    minify: !dev,
    sourcemap: dev,
    outdir: path.resolve(__dirname, '../www/assets/js/'),  
    // inject debug state
    define: {
      'DEBUG': JSON.stringify(dev),
    },
    plugins: [
      vuePlugin({
        
      }),
      require('./plugins/cssInline.cjs')({
        transform: async (contents, args) => {
          const result = await postCss(postCssPlugins).process(contents, { from: args.path });
          return result.css;
        }
      }),
      glsl({
        minify: !dev,
      })
    ],
  });
  
  if(dev) {
    await ctx.watch();
    console.log('JS: Watching for changes...');
  } else {
    console.log('JS: Rebuilding...');
    await ctx.rebuild();
    console.log('JS: Done!');
    ctx.dispose();
  }
}

start();