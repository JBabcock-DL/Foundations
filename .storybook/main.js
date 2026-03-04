

/** @type { import('@storybook/react-vite').StorybookConfig } */
const isChromaticBuild = Boolean(process.env.CHROMATIC);

const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    !isChromaticBuild && "@storybook/addon-vitest"
  ].filter(Boolean),
  "framework": "@storybook/react-vite"
};
export default config;
