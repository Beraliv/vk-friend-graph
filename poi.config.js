const path = require('path')
const pkg = require('./package')

module.exports = {
  entry: [
    'src/polyfills.js',
    'src/index.js'
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue']
  },
  html: {
    title: pkg.productName,
    description: pkg.description,
    template: path.join(__dirname, 'index.ejs')
  },
  modules: {
    rules: [
      {
        test: /\.vue$/,
        enforce: 'pre',
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /\.min.js$/
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  postcss: {
    plugins: [
      // Your postcss plugins
    ]
  },
  presets: [
    require('poi-preset-bundle-report')()
  ]
}
