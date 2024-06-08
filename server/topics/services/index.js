import TopicModel from '../model/index.js';
import QuestionModel from '../../questions/model/index.js';
import logger from '../../../common/utils/logger.js';

class TopicsService {
  async getTopicQuestions(topicContent) {
    try {
      const topicSelector = {
        content: topicContent
      };
      const topic = await TopicModel.findOne(topicSelector);
      if (!topic) {
        throw new Error('Invalid Annotation.');
      }

      const allTopics = [topic._id, ...topic.subTopics];

      const questionsSelector = {
        topicsIds: { $in: allTopics }
      };
      const questions = await QuestionModel.find(questionsSelector, {
        projection: { _id: 0, number: 1 }
      });
      const questionNumbers = questions.map(question => question.number);
      return questionNumbers;
    } catch (error) {
      logger.error(`[getTopicQuestions] An error happened ${error}`);
      throw error;
    }
  }
}

export default new TopicsService();
