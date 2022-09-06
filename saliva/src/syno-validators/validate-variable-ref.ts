import { VariableRef } from '../types/synos/variable-ref';

export default (
  variableRef: VariableRef,
): boolean => {
  return !!(variableRef.referent);
  // value.syntype !== 'booleanLiteral' -> false
};
