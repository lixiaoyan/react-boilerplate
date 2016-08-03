import path from "path";
import webpack from "webpack";
import autoprefixer from "autoprefixer";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

import config from "../../config.json";

export default env => {
  const production = env === "production";
  return {
    devtool: production ? "source-map" : "eval",
    context: path.resolve("./src"),
    entry: {
      app: ".",
    },
    output: {
      path: path.resolve("./dist"),
      publicPath: config.baseURL,
      filename: "scripts/[name].[chunkhash:8].js",
      chunkFilename: "scripts/[name].[chunkhash:8].js",
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
                  autoprefixer: false,
                },
              },
              "postcss",
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
        debug: !production,
        minimize: production,
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env),
      }),
      production && new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
      new ExtractTextPlugin({
        filename: "styles/[name].[contenthash:8].css",
        allChunks: true,
        disable: !production,
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        title: config.title,
        minify: production && {
          removeComments: true,
          collapseWhitespace: true,
        },
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
