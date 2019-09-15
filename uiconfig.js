module.exports = {
  savePreferencesToLocalStorage: true,
  experiments: [
    {
      displayName: "Font Casing Experiment",
      additionalText: "Changes font casing for the entire website.",
      __needsAdditionalImports: false,
      id: "FONT.CASING.EXPERIMENT",
      data: {
        value: {
          current: false,
          availableOptions: [true, false]
        }
      }
    }
  ]
};
