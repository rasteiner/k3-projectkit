if(process.title.includes('gulp')) {
  module.exports = {
    plugins: {
    }
  }
} else {
  module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  }
}


if(process.env.NODE_ENV === 'production') {
  module.exports.plugins.cssnano = {
    preset: ['default', {
      discardComments: {
          removeAll: true,
      },
    }],
  }
}
