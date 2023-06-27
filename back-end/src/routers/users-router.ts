import { Router } from 'express';
import { usersPost } from '../controllers/users-controller';
import { createUserSchema } from '../schemas';
import { validateBody } from '../middlewares/validation-middleware';

const usersRouter = Router();

usersRouter.post('/', validateBody(createUserSchema), usersPost);

export { usersRouter };
