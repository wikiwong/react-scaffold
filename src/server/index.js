// import http from 'http';
// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import url from 'url';
// import { App } from '../components/App';
const http = require('http');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const url = require('url');
const App = require('../components/App').default;

const domain = 'http://localhost';
const port = '9000';

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
        ${ReactDOMServer.renderToString(
            <App 
              color={query.color}
            />
        )}
        <script src="${domain}:${port}/app.js"></script>
      </body>
      </html>
    `, 'utf-8');
  });
}).listen(8080); // Activates this server, listening on port 8080.