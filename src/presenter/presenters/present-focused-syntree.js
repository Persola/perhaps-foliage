// @flow
import ascendToRoot from '../../syntree-utils/ascend-to-root.js'
import presentSyntree from './present-syntree.js'

import type { Prestree } from '../../types/presentations/prestree.js'
import type { Syno } from '../../types/syno.js'

export default (
  focusedSyno: Syno,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): Prestree => {
  const renderingRoot = ascendToRoot(focusedSyno, getSyno);
  return presentSyntree(renderingRoot, scope, getSyno, focusNodeId);
}
