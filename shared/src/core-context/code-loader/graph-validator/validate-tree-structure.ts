import invalidate from './invalidate';
import printList from './print-list';
import scanDescendants from './scan-descendants';

import type { SynoMap } from '../../../types/syntactic/syno-map';
import type { Grammar } from '../../../types/grammar/grammar';
import type { GraphValidationResult } from '../../../types/code-loader/graph-validation-result';

/**
 * Given a syntree which is locally well-formed, make sure it is globally well-formed
*/
export default (
  graph: SynoMap,
  grammar: Grammar,
  primitives: SynoMap,
): GraphValidationResult => {
  const result = {
    valid: true,
    messages: [],
  };

  const rootSynos = Object.values(graph).filter(syno => syno.parent === null);
  if (rootSynos.length < 1) {
    invalidate(result, 'No root syno (syno with parent property as null)');
    return result;
  }
  if (rootSynos.length > 1) {
    invalidate(result, `More than one root syno for syno map (IDs: ${printList(rootSynos.map(s => s.id))})`);
    return result;
  }
  if (rootSynos.length !== 1) {
    invalidate(result, `Strange number of roots '${rootSynos.length}' (${typeof rootSynos.length})`);
    return result;
  }

  const rootSyno = rootSynos[0];

  if (grammar[rootSyno.syntype].rootable !== true) {
    invalidate(result, `Tree root (ID ${rootSyno.id}) is of unrootable syntype '${rootSyno.syntype}'`);
    return result;
  }

  const synosAccountedFor = {};
  Object.keys(graph).forEach(key => { synosAccountedFor[key] = false; });
  scanDescendants(
    rootSyno,
    result,
    graph,
    grammar,
    synosAccountedFor,
    primitives,
  );
  const synosIdsNotAccountedFor = (
    Object.entries(synosAccountedFor)
      .filter(([id, accountedFor]) => !accountedFor) // eslint-disable-line
      .map(([id, accountedFor]) => id) // eslint-disable-line
  );

  if (synosIdsNotAccountedFor.length > 0) {
    invalidate(result, (
      `Syno map contains synos (IDs ${printList(synosIdsNotAccountedFor)})`
      + ` which are not descendants of root syno (ID ${rootSyno.id})`
    ));
  }

  return result;
};
