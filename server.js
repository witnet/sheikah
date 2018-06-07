/**
 * Setup and run the development server for Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const childProcess = require('child_process');

const webpackRenderer = require('./config/webpack.renderer');

const argv = require('minimist')(process.argv.slice(2));

const app = express();
const compiler = webpack(webpackRenderer);
const PORT = process.env.PORT || 3000;

const wdm = webpackDevMiddleware(compiler, {
  writeToDisk: true,
  publicPath: webpackRenderer.output.publicPath,
  stats: {
    colors: true
  }
});

app.use(wdm);

app.use(webpackHotMiddleware(compiler));

const server = app.listen(PORT, 'localhost', serverError => {
  if (serverError) {
    console.error(serverError);
    process.exit(1);
  }

  if (argv['exec']) {
    childProcess.exec(argv['exec'], { shell: true, env: process.env, stdio: 'inherit' })
      .on('close', code => process.exit(code))
      .on('error', spawnError => console.error(spawnError));
  }

  console.log(`Listening at http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('Stopping dev server');
  wdm.close();
  server.close(() => {
    process.exit(0);
  });
});
