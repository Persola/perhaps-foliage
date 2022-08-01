import type { GraphValidationResult } from '../../../types/code-loader/graph-validation-result';

export default (
  oldResult: GraphValidationResult,
  resultUpdate: GraphValidationResult,
): void => {
  oldResult.valid = oldResult.valid && resultUpdate.valid;
  oldResult.messages = [...oldResult.messages, ...resultUpdate.messages];
};
