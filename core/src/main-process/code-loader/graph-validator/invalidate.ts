import type { ValidationResult } from '../../../types/code-loader/validation-result';

export default (
  result: ValidationResult,
  message: (string | string[]),
): void => {
  result.valid = false;
  if (message instanceof Array) {
    result.messages = [...result.messages, ...message];
  } else {
    result.messages.push(message);
  }
};
