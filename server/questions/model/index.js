import QuestionSchema from '../schema/index.js';

class Question {
  async insertMany(documents, options = {}) {
    const result = await QuestionSchema.insertMany(documents, options);
    return result;
  }

  async find(selectors = {}, options = {}) {
    const { limit, skip, sort, projection } = options;
    const result = await QuestionSchema.find(selectors, projection || {})
      .sort(sort || '-updatedAt')
      .limit(limit)
      .skip(skip || 0)
      .lean()
      .maxTimeMS(60000);
    return result;
  }

  async findOne(selector = {}, projection = {}) {
    const result = await QuestionSchema.findOne(selector)
      .select(projection)
      .lean();
    return result;
  }

  async count(selectors = {}) {
    const result = await QuestionSchema.count(selectors).maxTimeMS(60000);
    return result;
  }

  async create(payload) {
    const result = await QuestionSchema.create(payload);
    return result;
  }

  async update(selector, newParams, options = {}) {
    const result = await QuestionSchema.findOneAndUpdate(selector, newParams, {
      runValidators: true,
      new: true,
      ...options
    });
    return result;
  }

  async updateMany(selector, newParams, options = {}) {
    const result = await QuestionSchema.updateMany(
      selector,
      newParams,
      options
    );
    return result;
  }

  async deleteMany(selector = {}) {
    const result = await QuestionSchema.deleteMany(selector);
    return result;
  }

  async aggregate(pipeline, options = {}) {
    const result = await QuestionSchema.aggregate(pipeline, {
      maxTimeMS: 60000
    })
      .sort(options.sort || 'createdAt')
      .skip(options.skip || 0)
      .limit(options.limit || 200);
    return result;
  }
}

export default new Question();
