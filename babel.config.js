const presetTypescript = require("@babel/preset-typescript");
const pluginProposalClassProperties = require("@babel/plugin-proposal-class-properties");

module.exports = {
  presets: [
    [
      presetTypescript,
      {
        allExtensions: true,
        isTSX: true
      }
    ]
  ],
  plugins: [pluginProposalClassProperties]
};
