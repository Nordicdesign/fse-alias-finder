// Example: snowpack.config.mjs
// The added "@type" comment will enable TypeScript type information via VSCode, etc.

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  plugins: [
    '@snowpack/plugin-sass'
    // '@snowpack/plugin-run-script',
    // {
    //   cmd: 'eslint src --ext .js,.jsx,.ts,.tsx',
    //   // Optional: Use npm package "eslint-watch" to run on every file change
    //   // watch: 'esw -w --clear src --ext .js,.jsx,.ts,.tsx'
    // },
  ],
  mount: {
    public: '/',
    src: '/dist'
  }
};
