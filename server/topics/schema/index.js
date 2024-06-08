import mongoose from 'mongoose';
import nanoid from '../../../common/utils/nanoId.js';

const topicSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid()
  },
  content: {
    type: String,
    required: true
  },
  subTopics: [{ type: String, ref: 'Topic' }]
});

topicSchema.index({ content: 1, unique: true });

const Topic = mongoose.model('Topic', topicSchema);

export default Topic;
