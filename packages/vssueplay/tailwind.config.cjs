const { addDynamicIconSelectors } = require("@iconify/tailwind");

module.exports = {
  darkMode: ["selector"],
  content: ["**/*/index.html", "**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [
    // Iconify plugin
    addDynamicIconSelectors(),
  ],
};
