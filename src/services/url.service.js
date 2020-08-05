class UrlService {
  constructor() {
    this.model = require('../lib/models/url.model');
  }

  async save(slug, url) {
    const existing = await this.findBySlug(slug);
    if (existing) {
      throw new Error('Slug in use. \u{1F354}');
    }

    const inserted = await this.model.insert({ slug, url });
    delete inserted._id;
    return inserted;
  }

  findBySlug(slug) {
    return this.model.findOne({ slug });
  }
}

const urlService = new UrlService();
module.exports = { urlService };
