const express = require('express');
const next = require('next');
const port = parseInt(process.env.PORT, 10);
const isProduction = process.env.NODE_ENV === 'production';

const app = next({
    isProduction,
    dev: !isProduction,
    isDevelopment: !isProduction,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();


  server.get('/items/:id', (req, res) => {
      return app.render(req, res, '/item', Object.assign({id: req.params.id}, req.query))
  });

    server.get('/*', (req, res) => handle(req, res));

    server.listen(port, err => {
        if(err) throw err
        console.log(`> Read on http://localhost:${port}`);
    })
});

