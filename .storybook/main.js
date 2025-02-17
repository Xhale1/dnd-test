require("dotenv").config();

module.exports = {
  addons: [
    "@storybook/addon-storysource",
    "storybook-addon-performance/register",
  ],
  check: true,
  checkOptions: {
    tsconfig: "../stories/tsconfig.json",
  },
  stories: ["../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  reactOptions: {
    strictMode: true,
  },
  core: {
    builder: "webpack5",
  },
  // See https://github.com/storybookjs/storybook/issues/1291#issuecomment-795251283
  webpackFinal: async (config, { configType }) => {
    if (configType === "PRODUCTION") {
      config.output.publicPath = "/examples/";
    }
    return config;
  },
  managerWebpack: async (config, { configType }) => {
    if (configType === "PRODUCTION") {
      config.output.publicPath = "/examples/";
    }
    return config;
  },
  managerHead: (head, { configType }) => {
    if (configType === "PRODUCTION") {
      return `
        ${head}
        <base href="/examples/">
      `;
    }
  },
  // TODO: investigate adding these back
  // babel: async (options) => ({
  //   ...options,
  //   presets: ["@emotion/babel-preset-css-prop", ...options.presets],
  //   comments: false,
  // }),
  // webpackFinal: async (config) => {
  //   // We need to disable the hot module reloading when we run the lighthouse audit,
  //   // because it wait for the load to finish, but the /__webpack_hmr query never ends.
  //   // https://github.com/storybookjs/storybook/issues/3062#issuecomment-504550789
  //   if (process.env.DISABLE_HMR === "true") {
  //     config.entry = config.entry.filter(
  //       (singleEntry) => !singleEntry.includes("/webpack-hot-middleware/")
  //     );
  //   }

  //   return config;
  // },
};
