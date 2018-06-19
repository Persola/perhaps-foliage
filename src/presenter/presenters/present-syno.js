// @flow
import presentFunctionCall from './present-function-call.js'
import presentBooleanLiteral from './present-boolean-literal.js'

import type { syno } from '../../types/syno.js' // eslint-disable-line no-unused-vars
import type { presentationGraph } from '../../types/presentations/presentation-graph.js' // eslint-disable-line no-unused-vars

export default (
  node: syno,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): presentationGraph => {
  if (node === false) {
    return false;
  } else if (node.syntype === 'functionCall') {
    return presentFunctionCall(node, scope, getSyno, focusNodeId);
  } else if (node.syntype === 'booleanLiteral') {
    return presentBooleanLiteral(node, focusNodeId);
  } else {
    throw new Error('should be unreachable (new type?)')
  }
}
