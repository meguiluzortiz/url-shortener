const yup = require('yup');

const postUrlSchema = {
  url: yup.string().trim().url().required(),
  slug: yup
    .string()
    .trim()
    .matches(/^[\w\-]+$/i),
};

const validate = ({ shape, path = 'query' }) => async (req, _, next) => {
  const schema = yup.object().shape(shape);

  try {
    await schema.validate(req[path]);
    next();
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

module.exports = {
  postUrlSchema,
  validate,
};
