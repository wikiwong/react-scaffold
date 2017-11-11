import path from 'path';
import http from 'http';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import url from 'url';
import App from '../components/App';

const domain = 'http://localhost';
const port = '9000';

if (process.env.NODE_ENV === 'development') {
  const webpackDevServer = require('webpack-dev-server');
  const webpack = require('webpack');
  const config = require('../../config/webpack.dev.js');

  const options = {
    headers: { "Access-Control-Allow-Origin": "*" },
    contentBase: path.resolve("./dist"),
    compress: true,
    hot: true,
    inline: true,
    port: 9000,
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    }
  };
  
  const compiler = webpack(config);
  const mockCdn = new webpackDevServer(compiler, options);
  mockCdn.listen(9000, () => {
    console.log('Mocking CDN to host client bundle on port 9000');
  });
}

http.createServer((request, response) => {
  const { headers, method, url: reqUrl } = request;
  const { query } = url.parse(reqUrl, true);

  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    console.log('got data', chunk);
  }).on('end', () => {
    response.setHeader('Content-Type', 'text/html');
    response.end(`
      <html>
      <head>
        <link rel="stylesheet" href="${domain}:${port}/app.css" />
      </head>
      <body>
        <div id="app">${
          ReactDOMServer.renderToString(
              <App 
                color={query.color}
              />
          )}</div>
        <script src="${domain}:${port}/app.js"></script>
      </body>
      </html>
    `, 'utf-8');
  });
}).listen(8080); // Activates this server, listening on port 8080.