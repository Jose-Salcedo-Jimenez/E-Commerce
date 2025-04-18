import { producer } from "../kafka/producer";
import { v4 as uuidv4 } from "uuid";

export const emitUserRegisteredEvent = async (user: any) => {
  const event = {
    eventId: uuidv4(),
    timestamp: new Date().toISOString(),
    source: "UserService",
    topic: "welcome-flow",
    payload: {
      name: user.name,
      email: user.email,
    },
    snapshot: {
      userId: user._id,
      status: "REGISTERED",
    },
  };

  await producer.send({
    topic: "user-registration",
    messages: [
      {
        value: JSON.stringify(event),
      },
    ],
  });

  return event;
};
