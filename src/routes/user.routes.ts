import { Router } from 'express';
import { User } from '../config/user';
import { emitUserRegisteredEvent } from '../events/userRegisteredEvent';
const router = Router();


router.post('/api/users/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    const event = await emitUserRegisteredEvent(user);

    res.status(201).json({ user, event });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});


export default router;
