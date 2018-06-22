// @flow
import ascendToRoot from '../../syntree-utils/ascend-to-root.js'
import presentSyno from './present-syno.js'

import type { Presno } from '../../types/presentations/presno.js'
import type { Syno } from '../../types/syno.js'

export default (
  focusedSyno: Syno,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): Presno => {
  const renderingRoot = ascendToRoot(focusedSyno, getSyno);
  return presentSyno(renderingRoot, scope, getSyno, focusNodeId);
}
