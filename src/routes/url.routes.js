const express = require('express');
const router = express.Router();
const { validate, postUrlSchema } = require('../utils/validate');
const { nanoid } = require('nanoid');
const { urlService } = require('../services/url.service');

router.post(
  '/url',
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

router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const url = await urlService.findBySlug(slug);

    if (url) {
      res.redirect(url.url);
      return;
    }

    res.redirect(`/?error=${slug} not found`);
  } catch (error) {
    res.redirect(`/?error=Link not found`);
  }
});

module.exports = router;
