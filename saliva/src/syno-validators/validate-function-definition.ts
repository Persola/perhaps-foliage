import FunctionDefinition from '../synos/function-definition';

export default (
  funkshunDefAsSyno: FunctionDefinition,
): boolean => {
  const funkshunDef = new FunctionDefinition(funkshunDefAsSyno.id, funkshunDefAsSyno.tree);

  return (
    [
      'booleanLiteral',
      'functionCall',
      'variableRef',
    ].includes(funkshunDef.body()?.type)
    && funkshunDef.parameters().length === 2
    && funkshunDef.parameters().every(p => p.type === 'functionParameter')
  );
};
