import { isValidCPF, isValidMobilePhone } from '@brazilian-utils/brazilian-utils';
import Joi from 'joi';
import { User } from '@prisma/client';

const cpfValidationSchema = Joi.string().length(11).custom(joiCpfValidation).required();
const mobilePhoneValidationSchema = Joi.string().min(13).max(15).custom(joiMobilePhoneValidation).required();

export const createUserSchema = Joi.object<CreateUserParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(3).required(),
  surname: Joi.string().min(3).required(),
  phone: mobilePhoneValidationSchema,
  cpf: cpfValidationSchema,
  isOwner: Joi.boolean(),
});

export type CreateUserParams = Omit<User, 'createdAt' | 'updatedAt' | 'id'>;

function joiCpfValidation(value: string, helpers: Joi.CustomHelpers<string>) {
  if (!value) return value;

  if (!isValidCPF(value)) {
    return helpers.error('any.invalid');
  }

  return value;
}

function joiMobilePhoneValidation(value: string, helpers: Joi.CustomHelpers<string>) {
  if (!value) return value;

  if (!isValidMobilePhone(value)) {
    return helpers.error('any.invalid');
  }

  return value;
}
