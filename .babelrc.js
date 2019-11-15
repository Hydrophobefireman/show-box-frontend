const plugins = [
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-syntax-dynamic-import"
];
module.exports = {
  env: {
    modern: { presets: ["@babel/preset-modules"], plugins },
    legacy: {
      presets: [
        [
          "@babel/preset-env",
          {
            exclude: ["@babel/plugin-transform-typeof-symbol"],
            modules: false,
            loose: true,
            corejs: 3,
            targets: {
              browsers: ["last 2 versions", "ie >= 11", "op_mini all"]
            },
            useBuiltIns: "usage"
          }
        ]
      ],
      plugins: [...plugins, ["@babel/plugin-transform-runtime", { corejs: 3 }]]
    }
  }
};
