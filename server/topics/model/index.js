import TopicSchema from '../schema/index.js';

class Topic {
  async insertMany(documents, options = {}) {
    const result = await TopicSchema.insertMany(documents, options);
    return result;
  }

  async find(selectors = {}, options = {}) {
    const { limit, skip, sort, projection } = options;
    const result = await TopicSchema.find(selectors, projection || {})
      .sort(sort || '-updatedAt')
      .limit(limit)
      .skip(skip || 0)
      .lean()
      .maxTimeMS(60000);
    return result;
  }

  async findOne(selector = {}, projection = {}) {
    const result = await TopicSchema.findOne(selector)
      .select(projection)
      .lean();
    return result;
  }

  async count(selectors = {}) {
    const result = await TopicSchema.count(selectors).maxTimeMS(60000);
    return result;
  }

  async create(payload) {
    const result = await TopicSchema.create(payload);
    return result;
  }

  async update(selector, newParams, options = {}) {
    const result = await TopicSchema.findOneAndUpdate(selector, newParams, {
      runValidators: true,
      new: true,
      ...options
    });
    return result;
  }

  async updateMany(selector, newParams, options = {}) {
    const result = await TopicSchema.updateMany(selector, newParams, options);
    return result;
  }

  async deleteMany(selector = {}) {
    const result = await TopicSchema.deleteMany(selector);
    return result;
  }

  async aggregate(pipeline, options = {}) {
    const result = await TopicSchema.aggregate(pipeline, {
      maxTimeMS: 60000
    })
      .sort(options.sort || 'createdAt')
      .skip(options.skip || 0)
      .limit(options.limit || 200);
    return result;
  }
}

export default new Topic();
