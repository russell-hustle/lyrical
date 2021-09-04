module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "~": "./src",
        "~scripts": "./src/scripts",
      }
    }]
  ]
};
