import _ from "lodash";

export default class InterpolateHtmlPlugin {
  constructor(data) {
    this.data = data;
  }
  apply(compiler) {
    compiler.plugin("compilation", (compilation) => {
      compilation.plugin("html-webpack-plugin-before-html-processing", (data, callback) => {
        data.html = _.template(data.html, { variable: "data" })(this.data);
        callback(null, data);
      });
    });
  }
}
