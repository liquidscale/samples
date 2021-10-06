const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react()],
  logLevel: "warn",
  server: {
    cors: true,
  },
});
