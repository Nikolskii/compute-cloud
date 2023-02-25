const { celebrate, Joi } = require('celebrate');

const createMovieCelebrate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .uri({ scheme: ['http', 'https'] })
      .required(),
    trailerLink: Joi.string()
      .uri({ scheme: ['http', 'https'] })
      .required(),
    thumbnail: Joi.string()
      .uri({ scheme: ['http', 'https'] })
      .required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieCelebrate = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  createMovieCelebrate,
  deleteMovieCelebrate,
};
