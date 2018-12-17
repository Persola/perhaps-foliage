// @flow
import ascendToRoot from '../../syntree-utils/ascend-to-root.js'
import presentSyntree from './present-syntree.js'

import type { Prestree } from '../../types/presentations/prestree.js'
import type { SynoId } from '../../types/syno-id.js'

export default (
  focusedPresnoId: SynoId,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): Prestree => {
  const renderingRootId: SynoId = ascendToRoot(focusedPresnoId, getSyno).id;
  return presentSyntree(renderingRootId, scope, getSyno, focusNodeId);
}
