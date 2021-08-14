import type { SynoRef } from 'saliva-repl/dist/types/syntactic/syno-ref';

import type { Scope } from '../types/interpreter/scope';
import type { LiteralValue } from '../types/synos/literal-value';

export default (
  parentScope: Scope,
  ref: SynoRef,
): LiteralValue => {
  const matchingParamRes = parentScope.find(
    paramRes => paramRes[0].id === ref.id,
  );

  if (!matchingParamRes) {
    throw new Error('no matching parameter');
  }

  return matchingParamRes[1];
};
