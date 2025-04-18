import {kafka} from "../kafka/client"
export const producer = kafka.producer();

export const connectProducer = async () => {
  await producer.connect();
};
    