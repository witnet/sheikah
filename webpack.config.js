const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

console.log(__dirname);
let common_config = {
  node: {
    __dirname: true
  },
  mode: process.env.ENV || "development",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            ts: "ts-loader",
            css: "style!css!stylus",
            sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax"
          },
          esModule: true
        }
      },
      {
        test: /\.ts$/,
        enforce: "pre",
        loader: "tslint-loader",
        options: {
          typeCheck: true,
          emitErrors: true
        }
      },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, path.resolve(__dirname, "src/ui")],
        use: {
          loader: "ts-loader",
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        loader: ["html-loader", "pug-html-loader"]
      },
      {
        test: /\.styl$/,
        loader: ["style-loader", "css-loader", "stylus-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        query: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", "vue", "pug", "styl"],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/renderer/index.pug"
    })
  ]
};

module.exports = [
  Object.assign({}, common_config, {
    target: "electron-main",
    entry: {
      renderrer: "./src/main/index.ts"
    },
    output: {
      filename: "[name]-bundle.js",
      path: path.resolve(__dirname, "src/main/dist")
    }
  }),
  Object.assign({}, common_config, {
    target: "electron-renderer",
    entry: {
      ui: "./src/renderer/index.ts"
    },
    output: {
      filename: "[name]-bundle.js",
      path: path.resolve(__dirname, "src/renderer/dist")
    }
  })
];
