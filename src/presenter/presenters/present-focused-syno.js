// @flow
import ascendToRoot from '../../syntree-utils/ascend-to-root.js'
import presentSyno from './present-syno.js'

import type { presentationGraph } from '../../types/presentations/presentation-graph.js' // eslint-disable-line no-unused-vars
import type { syno } from '../../types/syno.js' // eslint-disable-line no-unused-vars

export default (
  focusedSyno: syno,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): presentationGraph => {
  const renderingRoot = ascendToRoot(focusedSyno, getSyno);
  return presentSyno(renderingRoot, scope, getSyno, focusNodeId);
}
