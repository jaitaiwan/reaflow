var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var APP_DIR = path.resolve(__dirname, 'src') + '/';

module.exports = {
  target: 'web',
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    APP_DIR + 'app/index.jsx'
  ],
  context: __dirname,
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'app.min.js',
    publicPath: '/'
  },
  resolve: {
    modules: ["node_modules"].concat(APP_DIR + 'app/', APP_DIR + 'sass/'),
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/partials/template.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin({
      filename: 'style.min.css',
      disable: false,
      allChunks: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      },
      compress: true,
      manage: false,
      beautify: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?sourceMap,modules'})
    },
    {
      test: /\.sass?/,
      loader: ExtractTextPlugin.extract({ fallback: 'style-loader',  use: [
        {loader: "css-loader", options: {
          modules: true,
          sourceMap: true,
          importLoaders: 1,
          localIdentName: "[name]__[local]__[hash:base64:24]"
        }},
        {loader: "sass-loader", options: {
          // Setup a easier route to sass files
          includePaths: [
            APP_DIR + "sass/"
          ],
          sourceMap: true
        }}
      ]
    }) },
    { test: /\.scss?/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader',  use: [
      {loader: "css-loader", options: {
        modules: true,
        sourceMap: true,
        importLoaders: 1,
        localIdentName: "[name]__[local]__[hash:base64:24]"
      }},
      {loader: "sass-loader", options: {
        // Setup a easier route to sass files
        includePaths: [
          APP_DIR + "sass/"
        ],
        sourceMap: true
      }}
    ]
  }) },
  { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
  { test: /\.(woff|woff2)$/, loader:'url-loader', options: {prefix: "font", limit: 500000} },
  { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader", options: {limit: 500000, mimetype: "application/octet-stream"} },
  { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader", options: {limit: 500000, mimetype: "image/svg+xml"}  }
  ]
  },
};
