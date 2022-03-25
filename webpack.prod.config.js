/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TersetJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[id].js',
    publicPath: 'http://vivecolegios.vhmsoluciones.com/',
    chunkFilename: 'js/[id].[chunkhash].js',
  },
  optimization: {
    //minimizer: [new TersetJSPlugin(), new OptimizeCSSAssetsPlugin()],
    concatenateModules: false,
    providedExports: false,
    usedExports: false,
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      vm: require.resolve('vm-browserify'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        dependency: { not: ['url'] },
        test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/',
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css',
      chunkFilename: 'css/[id].[chunkhash].css',
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, 'public/index.html'),
    //   minify: {
    //     collapseWhitespace: true,
    //     removeComments: true,
    //     removeRedundantAttributes: true,
    //     removeScriptTypeAttributes: true,
    //     removeStyleLinkTypeAttributes: true,
    //     useShortDoctype: true,
    //   },
    // }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, 'dist/js/*.dll.js'),
      outputPath: 'js',
      publicPath: 'http://http://vivecolegios.vhmsoluciones.com:3000/js',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['*/app.'],
    }),
  ],
};