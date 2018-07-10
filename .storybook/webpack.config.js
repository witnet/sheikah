const path = require("path");

// Shared styles configuration.
const sharedStylesConfiguration = [
  "style-loader",
  {
    loader: "css-loader",
    options: {
      importLoaders: 2,
      modules: true,
      localIdentName: "[path][name]__[local]--[hash:base64:5]"
    }
  }
];

module.exports = (storybookBaseConfig, configType) => {
  if (configType === "PRODUCTION") {
    // See https://github.com/storybooks/storybook/issues/1570
    storybookBaseConfig.plugins = storybookBaseConfig.plugins.filter(
      plugin => plugin.constructor.name !== "UglifyJsPlugin"
    );
  }

  // Add file loader.
  storybookBaseConfig.module.rules.push({
    test: /\.(png|jpg|gif|svg)$/,
    use: [
      {
        loader: "file-loader",
        options: {}
      }
    ],
    exclude: /node_modules/,
    include: [/stories/, /app/]
  });

  // Add url loader.
  storybookBaseConfig.module.rules.push({
    test: /\.(png|jpg|gif|svg)$/,
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 8192
        }
      }
    ],
    exclude: /node_modules/,
    include: [/stories/, /app/]
  });

  // Add less support.
  storybookBaseConfig.module.rules.push({
    test: /\.less$/,
    use: [
      "style-loader",
      "css-loader",
      {
        loader: "less-loader",
        options: {
          javascriptEnabled: true
        }
      }
    ]
  });

  // Add sass support.
  storybookBaseConfig.module.rules.push({
    test: /\.scss$/,
    use: [...sharedStylesConfiguration, "sass-loader"],
    exclude: /node_modules/,
    include: [/stories/, /app/, /styles/]
  });

  // Add css support.
  storybookBaseConfig.module.rules.push({
    test: /\.css$/,
    use: [...sharedStylesConfiguration],
    exclude: /node_modules/,
    include: [/stories/, /app/]
  });

  // Add typescript support.
  storybookBaseConfig.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: "babel-loader"
      },
      {
        loader: "awesome-typescript-loader",
        options: {
          configFileName: "config/tsconfig.storybook.json"
        }
      }
    ],
    exclude: /node_modules/,
    include: [/stories/, /app/]
  });

  storybookBaseConfig.resolve.extensions.push(".tsx");
  storybookBaseConfig.resolve.extensions.push(".ts");
  storybookBaseConfig.resolve.extensions.push(".scss");

  return storybookBaseConfig;
};
