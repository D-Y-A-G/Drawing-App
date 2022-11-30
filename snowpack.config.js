// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: "/", static: true },
    src: { url: "/dist" },
  },
  plugins: [
    "@snowpack/plugin-react-refresh",
    "@snowpack/plugin-dotenv",
    ["@snowpack/plugin-typescript", {}],
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    out: "build",
  },
  exclude: ["**/node_modules/**/*", "LICENSE"], // TODO: address 'LICENSE' file type which is causing snowpack build to fail
};
