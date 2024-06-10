## Overview

This project implements a backend service to manage and query topics and questions based on two provided sheets: `topics` and `questions`. The service extracts data from these sheets into a MongoDB database, allowing users to query questions by their topics and subtopics.

## Quick Explanation

The project involves extracting data from two sheets: `topics` and `questions`, into separate collections in a MongoDB database. Each question document contains references to topic documents, and each topic document contains references to its subtopics.

## Project Structure
```
./
├── common/
│ └── utils/
│ └── nanoId.js
├── config/
│ ├── dbConnection.js
│ └── env/
├── node_modules/
├── scripts/
│ ├── extractQuestions.js
│ └── extractTopics.js
├── server/
│ ├── express/
│ │ ├── app.js
│ │ └── router.js
│ ├── questions/
│ │ ├── model/
│ │ └── schema/
│ └── topics/
│ ├── controllers/
│ ├── helpers/
│ ├── model/
│ ├── schema/
│ └── services/
│ └── index.js
├── sheets/
│ ├── questions.csv
│ └── topics.csv
├── index.js
├── package.json
└── vercel.json
```

## Project Installation
After cloning the project:
```
npm i
```
create a .env file and add:
```
PORT=****
MONGODB_URI=<your-mongodb-uri>
```
Then, will run in development environment:
```
npm start
```

## Usage
- The application can be accessed through the deployed URL or by running it locally.
- Use the provided API endpoint to query topics and questions.
The deployed URL:
```
https://topics-questions-vo3j-p1zbd2fhp-amanysalahs-projects.vercel.app/api/v1/topics/search?q=_[TOPIC]_
```

## Features
- Extracts data from CSV sheets and stores it in a MongoDB database.
- Provides an API to query questions by their topics and subtopics.
- Indexed for efficient querying.

