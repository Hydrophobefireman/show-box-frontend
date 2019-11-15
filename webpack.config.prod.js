const minifier = require("terser-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  autoPrefixPlugin = require("autoprefixer"),
  configJS = require("./configs/uiconfig.js"),
  appConfig = require("./configs/appConfig.js"),
  StyleExtHtmlWebpackPlugin = require("style-ext-html-webpack-plugin");
const cfg = require("./.babelrc");
const WebpackModuleNomodulePlugin = require("webpack-module-nomodule-plugin");
// const mode = "development";
const mode = "production";
const prodOrDev = (a, b) => {
  return "production" === mode ? a : b;
};
const getCfg = isLegacy => ({
  devServer: {
    contentBase: `${__dirname}/docs`,
    port: 4200,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules\/(?!@hydrophobefireman))|(nomodulefix)|(htmlGenerator)/,
        use: [
          {
            loader: "babel-loader",
            options: cfg.env[isLegacy ? "legacy" : "modern"]
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: { ident: "postcss", plugins: [autoPrefixPlugin()] }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [{ loader: "url-loader", options: { fallback: "file-loader" } }]
      }
    ]
  },
  entry: `${__dirname}/static/js/App.js`,
  output: {
    path: `${__dirname}/docs`,
    filename: `[name]-[contenthash]${isLegacy ? "-@legacy" : "-modern"}.js`
  },
  mode,
  optimization: {
    minimizer: prodOrDev([new minifier({ parallel: !0 })], []),
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: "body",
      template: `${__dirname}/index.html`,
      xhtml: !0,
      favicon: "./favicon.ico",
      configs: [configJS, appConfig],
      minify: prodOrDev(
        {
          collapseBooleanAttributes: !0,
          collapseWhitespace: !0,
          html5: !0,
          minifyCSS: !0,
          removeEmptyAttributes: !0,
          removeRedundantAttributes: !0
        },
        !1
      )
    }),
    new WebpackModuleNomodulePlugin(isLegacy ? "legacy" : "modern"),
    new MiniCssExtractPlugin({}),
    new StyleExtHtmlWebpackPlugin({
      minify: prodOrDev(!0, !1)
    })
  ]
});
module.exports = prodOrDev([getCfg(false), getCfg(true)], getCfg(false));
