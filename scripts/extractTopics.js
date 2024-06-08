import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';
import nanoid from '../common/utils/nanoId.js';
import TopicModel from '../server/topics/model/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const topicsFilePath = path.resolve(__dirname, '../sheets/topics.csv');

export async function extractTopics() {
  // await TopicModel.deleteMany();
  const topicsMap = new Map();

  return new Promise((resolve, reject) => {
    fs.createReadStream(topicsFilePath)
      .pipe(csv())
      .on('data', row => {
        const level1 = row['Topic Level 1']?.trim(); // Biological Molecules
        const level2 = row['Topic Level 2']?.trim(); // Describe and carry out tests for
        const level3 = row['Topic Level 3']?.trim(); // Reducing sugars (Benedict's solution)

        if (level1 && !topicsMap.has(level1)) {
          topicsMap.set(level1, {
            _id: nanoid(),
            content: level1,
            subTopics: new Set()
          });
        }

        if (level2) {
          let level2Id;
          if (!topicsMap.has(level2)) {
            level2Id = nanoid();
            topicsMap.set(level2, {
              _id: level2Id,
              content: level2,
              subTopics: new Set()
            });
          }
          if (level2Id) topicsMap.get(level1).subTopics.add(level2Id);
        }

        if (level3) {
          let level3Id;
          if (!topicsMap.has(level3)) {
            level3Id = nanoid();
            topicsMap.set(level3, {
              _id: level3Id,
              content: level3,
              subTopics: new Set()
            });
          }
          if (level3Id) {
            topicsMap.get(level1).subTopics.add(level3Id);
            topicsMap.get(level2).subTopics.add(level3Id);
          }
        }
      })
      .on('end', async () => {
        try {
          const topicsArray = Array.from(topicsMap.values()).map(topic => ({
            _id: topic._id,
            content: topic.content,
            subTopics: Array.from(topic.subTopics)
          }));
          const docs = await TopicModel.insertMany(topicsArray);
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
