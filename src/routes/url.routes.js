const express = require('express');
const router = express.Router();
const { validate, postUrlSchema } = require('../utils/validate');
const { nanoid } = require('nanoid');
const { urlService } = require('../services/url.service');

router.post(
  '/',
  validate({
    shape: postUrlSchema,
    path: 'body',
  }),
  async (req, res, next) => {
    let { slug, url } = req.body;
    try {
      if (!slug) {
        slug = nanoid(5);
      }
      slug = slug.toLowerCase();
      const inserted = await urlService.save(slug, url);
      res.status(201).json(inserted);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:slug', async (req, res, next) => {
  const { slug } = req.params;
  try {
    const existing = await urlService.findBySlug(slug);

    if (!existing) {
      const error = new Error(`Slug \'${slug}\' not found.`);
      error.status = 404;
      throw error;
    }

    res.json({ slug, url: existing.url });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
