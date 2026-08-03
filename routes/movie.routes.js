const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();

// GET - todas las películas
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json({ error: 'Error al obtener las películas', details: err.message });
  }
});

// GET - película por id
router.get('/movies/id/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json({ error: 'No movie found by this id' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Error al obtener la película', details: err.message });
  }
});

// GET - película(s) por título
router.get('/movies/title/:title', async (req, res) => {
  const { title } = req.params;
  try {
    const movieByTitle = await Movie.find({ title });
    return res.status(200).json(movieByTitle);
  } catch (err) {
    return res.status(500).json({ error: 'Error al obtener la película', details: err.message });
  }
});

// GET - películas por género
router.get('/movies/genre/:genre', async (req, res) => {
  const { genre } = req.params;
  try {
    const movieByGenre = await Movie.find({ genre });
    return res.status(200).json(movieByGenre);
  } catch (err) {
    return res.status(500).json({ error: 'Error al obtener las películas', details: err.message });
  }
});

// GET - películas estrenadas a partir de un año
router.get('/movies/year/:year', async (req, res) => {
  const { year } = req.params;
  try {
    const movieByYear = await Movie.find({ year: { $gt: year } });
    return res.status(200).json(movieByYear);
  } catch (err) {
    return res.status(500).json({ error: 'Error al obtener las películas', details: err.message });
  }
});

// POST - crear una nueva película
router.post('/movies', async (req, res) => {
  const { title, director, year, genre } = req.body;
  try {
    if (!title || !director || !genre) {
      return res.status(400).json({ error: 'title, director y genre son obligatorios' });
    }
    const newMovie = new Movie({ title, director, year, genre });
    const savedMovie = await newMovie.save();
    return res.status(201).json(savedMovie);
  } catch (err) {
    return res.status(500).json({ error: 'Error al crear la película', details: err.message });
  }
});

// PUT - modificar una película existente
router.put('/movies/:id', async (req, res) => {
  const { id } = req.params;
  const { title, director, year, genre } = req.body;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { title, director, year, genre },
      { new: true, runValidators: true }
    );
    if (updatedMovie) {
      return res.status(200).json(updatedMovie);
    } else {
      return res.status(404).json({ error: 'No movie found by this id' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Error al modificar la película', details: err.message });
  }
});

// DELETE - eliminar una película
router.delete('/movies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (deletedMovie) {
      return res.status(200).json({ message: 'Película eliminada correctamente', movie: deletedMovie });
    } else {
      return res.status(404).json({ error: 'No movie found by this id' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Error al eliminar la película', details: err.message });
  }
});

module.exports = router;
