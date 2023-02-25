const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  createMovieCelebrate,
  deleteMovieCelebrate,
} = require('../validation/movies');

router.get('/', getMovies);
router.post('/', createMovieCelebrate, createMovie);
router.delete('/:movieId', deleteMovieCelebrate, deleteMovie);

module.exports = router;
