module.exports = {
  "setupTestFrameworkScriptFile": "<rootDir>/../test/setup.js",
  "modulePaths": [
    "<rootDir>/.."
  ],
  "roots": ["<rootDir>/.."],
  "globals": {
    "ts-jest": {
      "tsConfigFile": "../tsconfig.json"
    }
  },
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/../test/__mocks__/fileMock.js",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy"
  },
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "moduleDirectories": [
    "<rootDir>/../node_modules",
    "<rootDir>/../app/node_modules"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "testMatch": [
    "**/?(*.)(spec|test).ts?(x)"
  ]
}
