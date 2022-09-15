import FunctionDefinition from '../synos/function-definition';

export default (
  funkshunDef: FunctionDefinition,
): boolean => {
  return (
    [
      'booleanLiteral',
      'functionCall',
      'variableRef',
    ].includes(funkshunDef.body()?.type)
    && funkshunDef.parameters().every(p => p.type === 'functionParameter')
  );
};
