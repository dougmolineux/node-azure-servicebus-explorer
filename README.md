# node-azure-servicebus-explorer

To install and start (tested on Mac node v12.16.1):
`npm install && npm start`

topic-peek.js
  - peeks on a provided topic subscription

topic-send.js
  - sends an array of messages to topic

sample.env
  - requires the following variables defined
```
SERVICE_BUS_CONNECTION_STRING=
TOPIC_NAME=
SUBSCRIPTION_NAME=
```

Frontend
`npm run frontend`

Backend
`npm run backend`
