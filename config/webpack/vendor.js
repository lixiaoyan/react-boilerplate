import path from "path";
import R from "ramda";
import webpack from "webpack";

import packageInfo from "../../package.json";
import vendorConfig from "../../vendor.config.json";

export default ({ production } = {}) => {
  const env = production ? "production" : "development";
  return {
    devtool: "source-map",
    context: path.resolve("."),
    entry: {
      vendor: R.without(
        vendorConfig.excludes,
        R.union(
          vendorConfig.includes,
          Object.keys(packageInfo.dependencies),
        ),
      ),
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
  };
};
