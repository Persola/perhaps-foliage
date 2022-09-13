import Syno from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syno';

import type { Scope } from '../types/interpreter/scope';
import { BooleanLiteral } from '../types/synos/boolean-literal';

export default (
  parentScope: Scope,
  ref: Syno,
): BooleanLiteral => {
  const matchingParamRes = parentScope.find(
    paramRes => paramRes[0].id === ref.id,
  );

  if (!matchingParamRes) {
    throw new Error('no matching parameter');
  }

  return matchingParamRes[1];
};
