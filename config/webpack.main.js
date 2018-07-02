/**
 * Webpack config used to build the UI used by the Electron main
 * process (the nodejs backend).
 */
const path = require("path");
const webpack = require("webpack");
const webpackMergeConfigs = require("webpack-merge");
const webpackRenderer = require("./webpack.renderer");

const port = process.env.PORT || 3000;
const forProduction = process.env.NODE_ENV === "production";

const baseConfig = {
  devtool: "source-map",
  target: "electron-main",

  entry: [path.resolve(__dirname, "../app/main/index.ts")],

  resolve: {
    alias: {
      app: path.resolve(__dirname, "../app")
    },
    extensions: [".js", ".ts", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: { configFile: path.resolve(__dirname, "tsconfig.json") }
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(forProduction ? "production" : "development")
    })
  ],

  // Disables webpack processing of __dirname and __filename.
  // If you run the bundle in node.js it falls back to these values of node.js.
  // https://github.com/webpack/webpack/issues/2010
  node: {
    __dirname: false,
    __filename: false
  },

  externals: {
    "leveldown": "require('leveldown')"
  }
};

const productionConfig = {
  mode: "production"
};

const developmentConfig = {
  mode: "development",
  plugins: [
    // Add source map support for stack traces in node
    // https://github.com/evanw/node-source-map-support
    new webpack.BannerPlugin(
      { banner: "require(\"source-map-support\").install();", raw: true, entryOnly: false }
    )
  ]
};

if (forProduction) {
  console.log("Building \x1b[34mElectron MAIN\x1b[0m in \x1b[36mPRODUCTION\x1b[0m mode...")
  module.exports = webpackMergeConfigs(baseConfig, productionConfig);
} else {
  console.log("Building \x1b[34mElectron MAIN\x1b[0m in \x1b[36mDEVELOPMENT\x1b[0m mode...")
  module.exports = webpackMergeConfigs(baseConfig, developmentConfig);
}
