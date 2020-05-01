const path = require('path')

const common = {
  mode: 'production',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          configFile: './.eslintrc.json',
          cache: false
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime']
        }
      }
    ]
  },
  optimization: {
    minimize: false
  }
}

const client = Object.assign({}, common, {
  entry: {
    'sync-engine-client': './src/sync-engine-client.js',
  },
  output: {
    path: path.resolve(__dirname, 'example/client/libs'),
    filename: '[name].js',
    libraryExport: 'default',
    library: 'SyncEngine',
    libraryTarget: 'umd'
  }
})

const server = Object.assign({}, common, {
  entry: {
    'sync-engine-server': './src/sync-engine-server.js',
  },
  output: {
    path: path.resolve(__dirname, 'example/server/libs'),
    filename: '[name].js',
    libraryExport: 'default',
    library: 'SyncEngine',
    libraryTarget: 'commonjs2'
  }
})

module.exports = [
  client,
  server
]
