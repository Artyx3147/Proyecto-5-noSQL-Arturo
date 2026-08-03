const express = require('express');
require('dotenv').config();
const { connect } = require('./utils/db');
const movieRoutes = require('./routes/movie.routes');

connect();

const PORT = 3000;
const server = express();

// Necesario para poder leer req.body en POST y PUT
server.use(express.json());

server.use('/', movieRoutes);

// Middleware de errores (por si algo se escapa de los try/catch)
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});