module.exports = {
  preset: 'react-native',
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },  
  transformIgnorePatterns: [
    "node_modules/(?!(rn-qr-generator|react-navigation|react-native)/)"
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js"
  }
};

