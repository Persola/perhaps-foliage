import { Argument } from '../types/synos/argument';

export default (
  argument: Argument,
): boolean => {
  return !!(argument.parameter && argument.value);
};
