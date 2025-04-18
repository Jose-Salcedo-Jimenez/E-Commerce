import express from 'express';
import { connectDB } from './config/db';
import userRoutes from './routes/user.routes';
import { connectProducer } from './kafka/producer';
import { startWelcomeFlowConsumer } from './consumer/welcomeFlowConsumer';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(userRoutes);

(async () => {
  try {
    await connectDB();
    await connectProducer(); // Conectamos Kafka producer
    await startWelcomeFlowConsumer(); // 🔥 Iniciamos el consumidor

  } catch (error) {
    console.error("❌ Error al iniciar la app:", error);
    process.exit(1);
  }
})();

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
