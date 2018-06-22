// @flow
import ascendToRoot from '../../syntree-utils/ascend-to-root.js'
import presentSyno from './present-syno.js'

import type { PresentationGraph } from '../../types/presentations/presentation-graph.js' // eslint-disable-line no-unused-vars
import type { Syno } from '../../types/syno.js' // eslint-disable-line no-unused-vars

export default (
  focusedSyno: Syno,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): PresentationGraph => {
  const renderingRoot = ascendToRoot(focusedSyno, getSyno);
  return presentSyno(renderingRoot, scope, getSyno, focusNodeId);
}
