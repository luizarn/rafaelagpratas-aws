import Joi from 'joi';
import { SignInParams } from '../services/authentication-service';

export const signInSchema = Joi.object<SignInParams>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
