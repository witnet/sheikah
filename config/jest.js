module.exports = {
  "setupFilesAfterEnv": ["<rootDir>/../test/setup.js"],
  "modulePaths": [
    "<rootDir>/..",
  ],
  "roots": ["<rootDir>/.."],
  "moduleNameMapper": {
    "app\/(.*)$": "<rootDir>/../app/$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/../test/__mocks__/fileMock.js",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
  ],
  "moduleDirectories": [
    "<rootDir>/../node_modules",
    "<rootDir>/..",
    "<rootDir>/../lib",
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  "testMatch": [
    "**/?(*.)(spec|test).ts?(x)",
  ],
  "testURL": "http://localhost",
}
