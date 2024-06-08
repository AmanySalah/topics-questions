import mongoose from 'mongoose';
import nanoid from '../../../common/utils/nanoId.js';

const questionSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid()
  },
  number: {
    type: Number,
    required: true
  },
  topicsIds: {
    type: [
      {
        type: String,
        ref: 'Topic'
      }
    ]
  }
});

questionSchema.index({ topicsIds: 1 });

const Question = mongoose.model('Question', questionSchema);

export default Question;
