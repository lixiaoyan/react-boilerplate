import path from "path";
import webpack from "webpack";

import packageInfo from "../../package.json";

export default env => ({
  devtool: "source-map",
  context: path.resolve("."),
  entry: {
    vendor: Object.keys(packageInfo.dependencies),
  },
  output: {
    path: path.resolve("./dist/vendor"),
    filename: "[name].js",
    library: "[name]",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env),
    }),
    new webpack.DllPlugin({
      name: "[name]",
      path: path.resolve("./dist/vendor/[name].manifest.json"),
    }),
  ],
});
