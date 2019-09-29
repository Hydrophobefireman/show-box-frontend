const minifier = require("terser-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  autoPrefixPlugin = require("autoprefixer"),
  configJS = require("./configs/uiconfig.js"),
  appConfig = require("./configs/appConfig.js"),
  StyleExtHtmlWebpackPlugin = require("style-ext-html-webpack-plugin");
const BabelMultiTargetPlugin = require("webpack-babel-multi-target-plugin")
  .BabelMultiTargetPlugin;
// const mode = "development";
const mode = "production";
const devOrProd = (a, b) => {
  return "production" === mode ? a : b;
};

module.exports = {
  devServer: { contentBase: `${__dirname}/docs`, compress: !0, port: 4200 },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: [BabelMultiTargetPlugin.loader()]
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
  output: { path: `${__dirname}/docs`, filename: "[name]-[contenthash].js" },
  mode,
  optimization: {
    minimizer: devOrProd([new minifier({ parallel: !0 })], []),
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [
    new BabelMultiTargetPlugin({
      babel: {
        plugins: [
          // "@babel/plugin-transform-runtime",
          "@babel/plugin-proposal-class-properties"
        ]
      },
      targets: {
        legacy: { tagAssetsWithKey: true, key: "@legacy" },
        modern: {
          tagAssetsWithKey: false
        }
      }
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: `${__dirname}/index.html`,
      xhtml: !0,
      favicon: "./favicon.ico",
      configs: [configJS, appConfig],
      minify: devOrProd(
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
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].css",
      chunkFilename: "[id]-[contenthash].css"
    }),
    new StyleExtHtmlWebpackPlugin({
      minify: devOrProd(!0, !1),
      position: "head-bottom"
    })
  ]
};
