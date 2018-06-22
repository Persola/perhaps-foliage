// @flow
import presentBooleanLiteral from './present-boolean-literal.js'
import presentFunctionCall from './present-function-call.js'
import presentFunctionDefinition from './present-function-definition.js'
import presentFunctionParameter from './present-function-parameter.js'

import type { syno } from '../../types/syno.js' // eslint-disable-line no-unused-vars
import type { presentationGraph } from '../../types/presentations/presentation-graph.js' // eslint-disable-line no-unused-vars

export default (
  node: (syno | false),
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): presentationGraph => {
  if (node === false) {
    return false;
  } else if (node.syntype === 'booleanLiteral') {
    return presentBooleanLiteral(node, focusNodeId);
  } else if (node.syntype === 'functionCall') {
    return presentFunctionCall(node, scope, getSyno, focusNodeId);
  } else if (node.syntype === 'functionDefinition') {
    return presentFunctionDefinition(node, scope, getSyno, focusNodeId);
  } else if (node.syntype === 'functionParameter') {
    return presentFunctionParameter(node, scope, getSyno, focusNodeId);
  } else if (node.syntype === 'variableRef') {
    throw new Error('variableRef presentation not implemented');
  } else {
    throw new Error('should be unreachable (new type?)')
  }
}
