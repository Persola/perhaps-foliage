// @flow
import presentBooleanLiteral from './syntypes/present-boolean-literal.js'
import presentFunctionCall from './syntypes/present-function-call.js'
import presentFunctionDefinition from './syntypes/present-function-definition.js'
import presentFunctionParameter from './syntypes/present-function-parameter.js'
import presentArgument from './syntypes/present-argument.js'
import presentVariableRef from './syntypes/present-variable-ref.js'

import type { Syno } from '../../types/syno.js'
import type { SynoId } from '../../types/syno-id.js'
import type { PresnoMap } from '../../types/presentations/presno-map.js'
import type { Focus } from '../../types/editor-state/focus.js'

export default (
  presnoMap: PresnoMap,
  parentId: (SynoId | false),
  syno: (Syno | false),
  scope: {},
  getSyno: Function,
  focus: (Focus | false)
): SynoId => {
  let presentationAttrs: {};
  if (syno === false) {
    throw new Error('pressyno syno can be false?!');
  } else if (syno.syntype === 'booleanLiteral') {
    presentationAttrs = presentBooleanLiteral(presnoMap, syno, focus);
  } else if (syno.syntype === 'functionCall') {
    presentationAttrs = presentFunctionCall(presnoMap, syno, scope, getSyno, focus);
  } else if (syno.syntype === 'functionDefinition') {
    presentationAttrs = presentFunctionDefinition(presnoMap, syno, scope, getSyno, focus);
  } else if (syno.syntype === 'functionParameter') {
    presentationAttrs = presentFunctionParameter(presnoMap, syno, scope, getSyno, focus);
  } else if (syno.syntype === 'argument') {
    presentationAttrs = presentArgument(presnoMap, syno, scope, getSyno, focus);
  } else if (syno.syntype === 'variableRef') {
    presentationAttrs = presentVariableRef(presnoMap, syno, scope, getSyno, focus);
  } else {
    throw new Error('should be unreachable (new type?)')
  }

  const parent = !parentId ? false : {
    presnoRef: true,
    id: parentId
  };

  const presentation: any = Object.assign({}, presentationAttrs, {
    synoId: syno.id,
    parent
  });

  if ((typeof presnoMap[presentation.synoId]) !== 'undefined' ) {
    throw new Error('attempted to overwrite presno!');
  }

  presnoMap[presentation.synoId] = presentation;

  return presentation.synoId;
}
