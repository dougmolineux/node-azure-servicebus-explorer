const { ServiceBusClient } = require('@azure/service-bus');

// Load the .env file if it exists
require('dotenv').config();

const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING;
const topicName = process.env.TOPIC_NAME;
const subscriptionName = process.env.SUBSCRIPTION_NAME;

exports.peek = async () => {
  const sbClient = ServiceBusClient.createFromConnectionString(
    connectionString
  );
  const subClient = sbClient.createSubscriptionClient(
    topicName,
    subscriptionName
  );
  const msgArr = [];

  try {
    for (let i = 0; i < 20; i++) {
      const messages = await subClient.peek();
      if (!messages.length) {
        console.log('No more messages to peek');
        break;
      }
      msgArr.push(messages);
      console.log(`Peeking message #${i}: ${messages[0].body}`);
    }
    await subClient.close();
  } catch (e) {
    console.error(e);
  } finally {
    await sbClient.close();
    return msgArr;
  }
};
