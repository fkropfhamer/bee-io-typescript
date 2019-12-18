const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// use to exclude all node_modules from bundle
const nodeModules = {};
fs.readdirSync('node_modules')
  .filter((x) => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports =   
  {
    entry: './src/server/index.ts',
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
    plugins: [new CleanWebpackPlugin()],
    resolve: {
      extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
    },
    target: 'node',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'build'),
    },
    externals: nodeModules,
  }
