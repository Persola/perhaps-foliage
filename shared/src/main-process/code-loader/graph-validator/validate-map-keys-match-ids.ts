import invalidate from './invalidate';

import type { SynoMap } from '../../../types/syntactic/syno-map';
import type { GraphValidationResult } from '../../../types/code-loader/graph-validation-result';

export default (
  graph: SynoMap,
): GraphValidationResult => {
  const result = {
    valid: true,
    messages: [],
  };

  Object.entries(graph).forEach(([mapKeyForSyno, syno]) => {
    if (mapKeyForSyno !== syno.id) {
      invalidate(
        result,
        `Syno stored under key '${mapKeyForSyno}' has non-matching internal ID '${syno.id}'`,
      );
    }
  });

  return result;
};
