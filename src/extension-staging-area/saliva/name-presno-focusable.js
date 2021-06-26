// @flow
import NorPrimitiveId from './nor-primitive-id'

import type { SynoMap } from '../../types/syno-map'
import type { Syno } from '../../types/syno'
import type { FunctionDefinition } from './types/synos/function-definition'
import type { FunctionCall } from './types/synos/function-call'

export default {
  'functionCall': (syno: Syno, synoMap: SynoMap): boolean => {
    if (syno.syntype !== 'functionCall') { throw 'ah!'; }
    if (syno.callee === false) { return false; }
    const callee = synoMap[syno.callee.id];
    return (
      syno.callee !== false &&
      callee.id !== NorPrimitiveId &&
      callee.syntype !== 'functionDefinition' // not used yet
    )
  },
  'argument': (syno: Syno, synoMap: SynoMap): boolean => {
    if (syno.parent === false) { throw 'argument is root?'; }
    const functionCall = synoMap[syno.parent.id];
    if (functionCall.syntype !== 'functionCall') { throw 'argument parent is not function call? (flow)'; }
    if (!functionCall.callee) { return true; }
    const callee = synoMap[functionCall.callee.id];
    return callee.id !== NorPrimitiveId
  },
  'functionDefinition': (syno: Syno, synoMap: SynoMap): boolean => {
    return syno.id !== NorPrimitiveId
  },
  'functionParameter': (syno: Syno, synoMap: SynoMap): boolean => {
    if (syno.parent === false) { throw 'parameter is root? (flow)'; }
    const functionDefinition = synoMap[syno.parent.id];
    return functionDefinition.id !== NorPrimitiveId
  },
  'functionArgument': (syno: Syno, synoMap: SynoMap): boolean => false,
  'variableRef': (syno: Syno, synoMap: SynoMap): boolean => false
}
