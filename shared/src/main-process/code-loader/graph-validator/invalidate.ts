import type { GraphValidationResult } from '../../../types/code-loader/graph-validation-result';

export default (
  result: GraphValidationResult,
  message: (string | string[]),
): void => {
  result.valid = false;
  if (message instanceof Array) {
    result.messages = [...result.messages, ...message];
  } else {
    result.messages.push(message);
  }
};
