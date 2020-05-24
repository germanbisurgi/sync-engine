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
  },
  performance: {
    hints: false
  }
}

const client = Object.assign({}, common, {
  entry: {
    'sync-engine-client': './src/sync-engine-client.js'
  },
  output: {
    path: path.resolve(__dirname, 'example/client/assets/js'),
    filename: '[name].js',
    libraryExport: 'default',
    library: 'SyncEngineClient',
    libraryTarget: 'umd'
  }
})

const server = Object.assign({}, common, {
  entry: {
    'sync-engine-server': './src/sync-engine-server.js'
  },
  output: {
    path: path.resolve(__dirname, 'example/server'),
    filename: '[name].js',
    libraryExport: 'default',
    library: 'SyncEngineServer',
    libraryTarget: 'commonjs2'
  }
})

module.exports = [
  client,
  server
]
