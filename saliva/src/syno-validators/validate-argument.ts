import Argument from '../synos/argument';

export default (
  argumentAsSyno: Argument,
): boolean => {
  const funkshunDef = new Argument(argumentAsSyno.id, argumentAsSyno.tree);

  return [
    'booleanLiteral',
    'functionCall',
    'variableRef',
  ].includes(funkshunDef.value()?.type);
};
