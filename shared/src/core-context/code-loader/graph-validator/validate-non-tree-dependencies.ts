import forSynoRefIn from '../../../syntree-utils/read-node/for-syno-ref-in';
import invalidate from './invalidate';

import type { SynoMap } from '../../../types/syntactic/syno-map';
import type { Grammar } from '../../../types/grammar/grammar';
import type { GraphValidationResult } from '../../../types/code-loader/graph-validation-result';

export default (
  graph: SynoMap,
  grammar: Grammar,
  primitives: SynoMap,
): GraphValidationResult => {
  const result = {
    valid: true,
    messages: [],
  };

  Object.values(graph).forEach(syno => {
    forSynoRefIn(syno, (synoRef, relation) => {
      if (synoRef.relation === 'non-tree') {
        const referent = graph[synoRef.id];
        if (referent === undefined) {
          if (primitives[synoRef.id] === undefined) {
            invalidate(
              result,
              `Syno (ID ${syno.id}) contains reference to missing syno (ID ${synoRef.id})`,
            );
          }
        } else {
          const expectedSyntype = grammar[syno.syntype].nonTreeRefs[relation];
          if (referent.syntype !== expectedSyntype) {
            invalidate(
              result,
              `Syno (ID ${syno.id}) contains reference to syno (ID ${referent.id})`
              + ` of syntype '${referent.syntype}' under relation '${relation}',`
              + ` but grammar restricts '${relation}' references to syntype '${expectedSyntype}'`,
            );
          }
        }
      }
    });
  });

  return result;
};
