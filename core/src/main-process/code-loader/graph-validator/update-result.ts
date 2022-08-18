import type { ValidationResult } from '../../../types/code-loader/validation-result';

export default (
  oldResult: ValidationResult,
  resultUpdate: ValidationResult,
): void => {
  oldResult.valid = oldResult.valid && resultUpdate.valid;
  oldResult.messages = [...oldResult.messages, ...resultUpdate.messages];
};
