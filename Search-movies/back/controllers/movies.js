const Movie = require('../models/movie');
const httpStatusCodes = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });

    return res.status(httpStatusCodes.ok.code).send(movies);
  } catch (e) {
    next(e);
  }
  return undefined;
};
const createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({
      ...req.body,
      owner: req.user._id,
    });

    return res.status(httpStatusCodes.created.code).send(movie);
  } catch (e) {
    next(e);
  }
  return undefined;
};

const deleteMovie = async (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  try {
    const checkedMovie = await Movie.findById(movieId);

    if (!checkedMovie) {
      throw new NotFoundError(httpStatusCodes.notFound.messages.movie);
    }

    const moviedOwnerId = checkedMovie.owner.toString();

    if (userId !== moviedOwnerId) {
      throw new ForbiddenError(httpStatusCodes.forbidden.message);
    }

    const movie = await Movie.findByIdAndRemove(movieId);

    return res.status(httpStatusCodes.ok.code).send(movie);
  } catch (e) {
    next(e);
  }
  return undefined;
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
