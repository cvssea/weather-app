const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
  const isProd = env.prod || false;

  const entry = './src/index.js';
  const output = {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
  };

  // dev
  const devtool = isProd ? false : 'source-map';
  const devServer = {
    port: 3000,
    historyApiFallback: true,
    host: '0.0.0.0',
  };

  // plugins
  const plugins = [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].min.css',
    }),
    new HtmlWebpackPlugin({ template: './index.html' }),
  ];

  // clean production build
  isProd && plugins.push(new CleanWebpackPlugin());

  // proxy for CORS in dev mode
  const proxyEnv = new webpack.DefinePlugin({
    'process.env.CORS_PROXY': JSON.stringify(env.CORS_PROXY),
  });
  !isProd && plugins.push(proxyEnv);

  // rules
  const js = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: 3,
          },
        ],
        '@babel/preset-react',
      ],
    },
  };

  const scss = {
    test: /\.scss$/,
    use: [
      isProd ? MiniCssExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader',
        options: { sourceMap: true },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [require('autoprefixer')],
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: { sourceMap: true },
      },
    ],
  };

  const images = {
    test: /\.(svg|png|jpe?g|gif)$/,
    loader: 'file-loader',
    options: {
      outputPath: 'assets',
      publicPath: 'assets',
      name: '[name].[ext]',
    },
  };

  const module = {
    rules: [js, scss, images],
  };

  return {
    entry,
    output,
    devtool,
    devServer,
    plugins,
    module,
  };
};
