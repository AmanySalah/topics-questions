import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';
import nanoid from '../common/utils/nanoId.js';
import TopicsModel from '../server/topics/model/index.js';
import QuestionsModel from '../server/questions/model/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const questionsFilePath = path.resolve(__dirname, '../sheets/questions.csv');

export async function extractQuestions() {
  // await QuestionsModel.deleteMany();
  const questions = [];

  // get all topics into a map for quick lookup
  const topicsMap = new Map();
  const topics = await TopicsModel.find({});
  topics.forEach(topic => {
    topicsMap.set(topic.content.trim(), topic._id);
  });

  return new Promise((resolve, reject) => {
    fs.createReadStream(questionsFilePath)
      .pipe(csv())
      .on('data', row => {
        const questionNumber = parseInt(row['Question number']);
        const questionsTopics = [
          row['Annotation 1']?.trim(),
          row['Annotation 2']?.trim(),
          row['Annotation 3']?.trim(),
          row['Annotation 4']?.trim(),
          row['Annotation 5']?.trim()
        ].filter(Boolean);

        const topicIds = questionsTopics
          .map(topicContent => topicsMap.get(topicContent))
          .filter(Boolean);

        questions.push({
          _id: nanoid(),
          number: questionNumber,
          topicsIds: topicIds
        });
      })
      .on('end', async () => {
        try {
          const docs = await QuestionsModel.insertMany(questions);
          resolve(true);
        } catch (err) {
          reject(err);
        }
      })
      .on('error', error => {
        reject(error);
      });
  });
}
