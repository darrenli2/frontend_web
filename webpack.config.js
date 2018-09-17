const webpack = require('webpack');

const config = {
  serverBaseUrl: 'http://localhost:3000',
  devtool: "inline-source-map",
  entry:  __dirname + "/app/App.js",
  output: {
    path: "./public/js/",
    publicPath: "/js/",
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      exclude: /node_modules/,
      loader: "babel",
      query: {
        presets: ["es2015","react","stage-0"]
      }
    }]
  },
  devServer: {
    port: 8000,
    contentBase: "./public",
    colors: true,
    historyApiFallback: true,
    inline: true
  },
}

if (process.env.NODE_ENV === 'production') {
  config.serverBaseUrl = 'http://api.contactn.com';
  config.devtool = false;
  config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({comments: false}),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ];
};

module.exports = config;
