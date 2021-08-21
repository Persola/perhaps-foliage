import forSynoRefIn from '../../../syntree-utils/for-syno-ref-in';
import invalidate from './invalidate';

import type { SynoMap } from '../../../types/syntactic/syno-map';
import type { GraphValidationResult } from '../../../types/code-loader/graph-validation-result';

export default (
  graph: SynoMap,
  primitives: SynoMap,
): GraphValidationResult => {
  const result = {
    valid: true,
    messages: [],
  };

  Object.values(graph).forEach(syno => {
    forSynoRefIn(syno, synoRef => {
      if (synoRef.relation === 'non-tree') {
        if (graph[synoRef.id] === undefined) {
          if (primitives[synoRef.id] === undefined) {
            invalidate(
              result,
              `Syno (ID ${syno.id}) contains reference to missing syno (ID ${synoRef.id})`,
            );
          }
        }
      }
    });
  });

  return result;
};
