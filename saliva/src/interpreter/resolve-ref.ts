import Syno from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syno';
import BooleanLiteral from '../synos/boolean-literal';

import type { Scope } from '../types/interpreter/scope';

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
