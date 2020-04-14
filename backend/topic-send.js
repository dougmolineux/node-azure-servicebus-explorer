const { ServiceBusClient } = require("@azure/service-bus");

// Load the .env file if it exists
require("dotenv").config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING;
const topicName = process.env.TOPIC_NAME;

const listOfScientists = [
  {
    name: "Einstein",
    firstName: "Albert"
  },
  {
    name: "Kopernikus",
    firstName: "Nikolaus"
  }
];

async function main() {
  const sbClient = ServiceBusClient.createFromConnectionString(connectionString);

  // If sending to a Topic, use `createTopicClient` instead of `createQueueClient`
  const topicClient = sbClient.createTopicClient(topicName);
  const sender = topicClient.createSender();

  try {
    for (let index = 0; index < listOfScientists.length; index++) {
      const scientist = listOfScientists[index];
      const message = {
        body: `${scientist.firstName} ${scientist.name}`,
        label: "Scientist"
      };

      console.log(`Sending message: ${message.body} - ${message.label}`);
      await sender.send(message);
    }

    await topicClient.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
