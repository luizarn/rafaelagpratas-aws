import { ApplicationError } from '../protocols';

export function unauthorizedError(): ApplicationError {
  return {
    name: 'UnauthorizedError',
    message: 'Você deve estar logado(a) para efetuar a compra!',
  };
}
