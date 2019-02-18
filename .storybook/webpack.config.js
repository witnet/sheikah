const path = require("path")
module.exports = (baseConfig, env, config) => {
  // Antd css
  config.module.rules.push({
    test: /\.antd\.css$/,
    use: ["style-loader"],
  }) 
  // SASS stylesheets
  config.module.rules.push({
    test: /\.global\.(scss|sass)$/,
    use: [
      "style-loader",
      "css-loader?&sourceMap&importLoaders&localIdentName=[name]__[local]___[hash:base64:5]",
      "sass-loader"
    ]
  })  
  
  config.module.rules.push({
    test: /^((?!\.global).)*\.(scss|sass)$/,
    use: [
      "style-loader",
      "css-loader?modules&sourceMap&importLoaders&localIdentName=[name]__[local]___[hash:base64:5]",
      "sass-loader"
    ]
  }) 

  // CSS stylesheets
  config.module.rules.push({
    test: /^(?!foo).*\.css$/,
    exclude: /node_modules/,
      loaders: [
        "style-loader",
        "css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
      ]
    })
    
    config.module.rules.push({
      test: /node_modules.*\.css$/,
      loaders: [
        "style-loader",
        "css-loader?sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
      ]
    })

    // WOFF Font
    config.module.rules.push({
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "application/font-woff",
        }
      },
    })

    // WOFF2 Font
    config.module.rules.push({
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "application/font-woff",
        }
      }
    })

    // TTF Font
    config.module.rules.push({
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "application/octet-stream"
        }
      }
    })

    // EOT Font
    config.module.rules.push({
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: "file-loader",
    })

    // SVG Font
    config.module.rules.push({
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/svg+xml",
        }
      }
    })

    // Common Image Formats
    config.module.rules.push({
      test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
      use: "url-loader",
    }) 
    
    
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
        
        
        plugins: [
          ['import', { libraryName: "antd", style: false }]
        ]
        
        
      }
    })
  
  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.modules.push(path.resolve(__dirname, "../"))
  
  return config;
};


