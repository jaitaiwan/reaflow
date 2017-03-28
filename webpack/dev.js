const path = require('path'),
      webpack = require('webpack'),
      htmlWebpack = require('html-webpack-plugin'),
      BUILD_DIR = path.resolve(__dirname, '../build'),
      APP_DIR = path.resolve(__dirname, '../src'),
      PORT = process.env.PORT || '8033',
      HOST = process.env.HOST || '0.0.0.0',
      reactDirs = [`${APP_DIR}/app/`]

// Export the webpack configuration
module.exports = {
  // Enable source maps as a devtool
  devtool: 'source-map',

  // Setup the entry point for the react application
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    `${APP_DIR}/app/entrypoint.jsx`
  ],

  // Find files with the following extensions
  resolve: {
    modules: ['node_modules'].concat(reactDirs),
    extensions: ['.js', '.jsx']
  },

  // Setup where we want the resulting vanilla js to go
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },

  // List plugins we use to compile and run our app
  module: {
    rules: [
      // Compile all jsx files to vanilla js using babel
      {
        test: /\.jsx?/,
        include: `${APP_DIR}/app/`,
        use: 'babel-loader'
      },
      // Minify and include all css files that have been imported
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }
         ]
      },
      // Compile and minify all sass files
      {
        test: /\.sass?/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:24]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
            // Setup a easier route to sass files
            includePaths: [
              `${APP_DIR}/app`
            ],
            sourceMap: true
          }
        }]
      },
      {
        test: /\.scss?/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:24]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              // Setup a easier route to sass files
              includePaths: [
                `${APP_DIR}/app`
              ],
              sourceMap: true
            }
          }]
        },
        // Ability to import json modules
        {
          test: /\.json$/,
          loader: 'json-loader'
        }]
      },
      // Configuration for the dev server started by `npm start`
      devServer: {
        contentBase: BUILD_DIR, // Location of built files
        hot: true, // Turn on hot-reload
        port: PORT, // Use the port specified at runtime
        historyApiFallback: { // Let the react app handle 404s
          disableDotRule: true
        },
        host: '0.0.0.0'
      },

      // Add plugins to webpack
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(), // Allows compilation to continue for other modules even if one fails
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpack({ // Creates a dynamic html that includes css js etc on demand when added to jsx files
      template: `${APP_DIR}/app/partials/template.html`
    })
  ]
}
