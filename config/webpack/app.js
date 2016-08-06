import fs from "mz/fs";
import path from "path";
import webpack from "webpack";
import autoprefixer from "autoprefixer";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import AddAssetHtmlPlugin from "add-asset-html-webpack-plugin";

import config from "../../config.json";

export default async ({ production } = {}) => {
  const env = production ? "production" : "development";
  let manifest;
  try {
    manifest = JSON.parse(await fs.readFile("./dist/vendor/vendor.manifest.json"));
  } catch (err) {
    manifest = null;
  }
  return {
    devtool: production ? "source-map" : "cheap-eval-source-map",
    context: path.resolve("./src"),
    entry: {
      app: ".",
    },
    output: {
      path: production
        ? path.resolve("./dist/deploy")
        : path.resolve("./dist/app"),
      publicPath: config.baseURL,
      filename: production
        ? "scripts/[name].[chunkhash:8].js"
        : "scripts/[name].js",
      chunkFilename: production
        ? "scripts/[name].[chunkhash:8].js"
        : "scripts/[name].js",
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel",
        },
        {
          test: /\.json$/,
          loader: "json",
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: "style",
            loader: [
              {
                loader: "css",
                query: {
                  sourceMap: true,
                  autoprefixer: false,
                },
              },
              "postcss",
            ],
          }),
        },
        {
          test: /\.(sass|scss)$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: "style",
            loader: [
              {
                loader: "css",
                query: {
                  sourceMap: true,
                  autoprefixer: false,
                },
              },
              "postcss",
              "resolve-url",
              {
                loader: "sass",
                query: {
                  sourceMap: true,
                },
              },
            ],
          }),
        },
        {
          test: /\.(webp|png|ico|jpg|jpeg|gif|svg|ttf|eot|woff|woff2)$/,
          loader: "file",
          query: {
            name: "assets/[name].[hash:8].[ext]",
          },
        },
        {
          test: /\.html$/,
          loader: "html",
        },
      ],
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: production,
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env),
      }),
      !production && manifest && new webpack.DllReferencePlugin({
        context: path.resolve("."),
        manifest,
      }),
      production && new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false,
        },
      }),
      new ExtractTextPlugin({
        filename: production
          ? "styles/[name].[contenthash:8].css"
          : "styles/[name].css",
        allChunks: true,
        disable: !production,
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "../template.ejs",
        title: config.title,
        xhtml: true,
        minify: production && {
          removeComments: true,
          collapseWhitespace: true,
        },
      }),
      !production && manifest && new AddAssetHtmlPlugin({
        filepath: path.resolve("./dist/vendor/vendor.js"),
        includeSourcemap: true,
        outputPath: "./vendor",
        publicPath: `${config.baseURL}vendor/`,
      }),
    ].filter(item => item),
    postcss() {
      return [autoprefixer];
    },
    devServer: {
      host: "0.0.0.0",
      port: 8080,
      publicPath: config.baseURL,
      historyApiFallback: true,
    },
  };
};
