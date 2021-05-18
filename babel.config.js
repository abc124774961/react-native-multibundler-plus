module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        "root": ["./modules"],
        "extensions": [".js"]
      }
    ],
    ['@babel/plugin-proposal-decorators', { 'legacy': true }]
  ]
};
