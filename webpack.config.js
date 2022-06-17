const path = require('path');
const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: process.env.NODE_ENV,
  entry: {
    index: `${srcPath}/assets/scripts/index.js`,
  },
  output: {
    path: distPath,
    filename: 'index.js',
  },
  devServer: {
    static: {
      directory: path.join(srcPath),
      staticOptions: {},
      serveIndex: true,
      watch: true,
    },
    hot: 'only',
    port: 3000,
  },
  resolve: {
    extensions: ['.js', '.vue', '.jsx'],
    alias: {
      '@styles': `${srcPath}/assets/styles`,
      '@scripts': `${srcPath}/assets/scripts`,
    },
  },
  module: {
    rules: [
      {
        //vueのloader設定
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/react'],
          },
        },
      },
      {
        // css, scssのloader設定
        test: /(\.s[ac]ss)$/,
        use: ['css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: 'head',
      filename: 'index.html', //出力するためのHTML
      template: `${srcPath}/index.html`,
      scriptLoading: 'defer',
      minify: false,
    }),
  ],
};

module.exports = config;
