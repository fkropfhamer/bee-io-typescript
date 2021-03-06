const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const SRC = path.resolve(__dirname, "src", "client", "assets");

module.exports = {
      entry: './src/client/js/main.ts',
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
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader'],
          },
          {
            test: /\.mp3$/,
            include: SRC,
            loader: 'file-loader'
          },
        ],
      },
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'src', 'client', 'index.html'),
        }),
      ],
      resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
      },
      output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public'),
      },
    };
    