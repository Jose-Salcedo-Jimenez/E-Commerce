import { kafka } from "../kafka/client"; // tu cliente Kafka
import { producer } from "../kafka/producer"; // para emitir a welcome-flow

const consumer = kafka.consumer({ groupId: "welcome-flow-group" });

export const startWelcomeFlowConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "user-registration", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) return;

      const incomingEvent = JSON.parse(message.value.toString());

      console.log("WelcomeFlow recibió:", incomingEvent);

      const notificationEvent = {
        source: "UserService",
        topic: "notifications",
        payload: incomingEvent.payload,
      };

      await producer.send({
        topic: "welcome-flow",
        messages: [
          {
            value: JSON.stringify(notificationEvent),
          },
        ],
      });

      console.log("WelcomeFlow emitió evento a 'welcome-flow' con topic 'notifications'");
    },
  });
};
