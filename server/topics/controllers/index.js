import { StatusCodes } from 'http-status-codes';
import topicService from '../services/index.js';
import { GET_TOPICS_QUESTIONS } from '../helpers/constants.js';

export default {
  [GET_TOPICS_QUESTIONS]: async (req, res, next) => {
    try {
      const topicContent = req.query?.q;
      if (!topicContent)
        throw new Error('Topic Content/annotation is required.');

      const questionNumbers =
        await topicService.getTopicQuestions(topicContent);
      return res.status(StatusCodes.OK).json({
        success: true,
        questionNumbers
      });
    } catch (error) {
      return next(new Error(error.message));
    }
  }
};
