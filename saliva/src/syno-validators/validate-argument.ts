import Argument from '../synos/argument';

export default (
  argument: Argument,
): boolean => {
  return [
    'booleanLiteral',
    'functionCall',
    'variableRef',
  ].includes(argument.value().type);
};
