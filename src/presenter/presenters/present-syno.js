// @flow
import presentBooleanLiteral from './syntypes/present-boolean-literal.js'
import presentFunctionCall from './syntypes/present-function-call.js'
import presentFunctionDefinition from './syntypes/present-function-definition.js'
import presentFunctionParameter from './syntypes/present-function-parameter.js'
import presentVariableRef from './syntypes/present-variable-ref.js'

import type { Syno } from '../../types/syno.js'
import type { Presno } from '../../types/presentations/presno.js'

export default (
  syno: (Syno | false),
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): Presno => {
  if (syno === false) {
    return false;
  } else if (syno.syntype === 'booleanLiteral') {
    return presentBooleanLiteral(syno, focusNodeId);
  } else if (syno.syntype === 'functionCall') {
    return presentFunctionCall(syno, scope, getSyno, focusNodeId);
  } else if (syno.syntype === 'functionDefinition') {
    return presentFunctionDefinition(syno, scope, getSyno, focusNodeId);
  } else if (syno.syntype === 'functionParameter') {
    return presentFunctionParameter(syno, scope, getSyno, focusNodeId);
  } else if (syno.syntype === 'variableRef') {
    return presentVariableRef(syno, scope, getSyno, focusNodeId);
  } else {
    throw new Error('should be unreachable (new type?)')
  }
}
