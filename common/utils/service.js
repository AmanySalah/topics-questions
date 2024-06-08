import { extractTopics } from '../../scripts/extractTopics.js';
import { extractQuestions } from '../../scripts/extractQuestions.js';

export const prepareDBData = async () => {
  const topicsRes = await extractTopics();
  if (!topicsRes)
    throw new Error(
      'Something went wrong while extracting topics from the sheet'
    );
  
  const questionsRes = await extractQuestions();
  if (!questionsRes)
    throw new Error(
      'Something went wrong while extracting questions from the sheet'
    );
};
