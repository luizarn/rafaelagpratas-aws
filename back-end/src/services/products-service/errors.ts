import { ApplicationError } from '../../protocols';

export function duplicatedTitleError(): ApplicationError {
  return {
    name: 'DuplicatedTitleError',
    message: 'Já existe um produto com o título da requisição',
  };
}

export function maximumLimitEmphasisError(): ApplicationError {
  return {
    name: 'MaximumLimitEmphasisError',
    message: 'O limite de produtos em destaque já foi atingido',
  };
}

export function maximumLimitLaunchError(): ApplicationError {
  return {
    name: 'MaximumLimitLaunchError',
    message: 'O limite de produtos em lançamentos já foi atingido',
  };
}
