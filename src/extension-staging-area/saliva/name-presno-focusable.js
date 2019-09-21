// @flow
import NorPrimitiveId from './nor-primitive-id'

import type { SynoMap } from '../../types/syno-map'
import type { Syno } from '../../types/syno'
import type { FunctionDefinition } from './types/synos/function-definition'
import type { FunctionCall } from './types/synos/function-call'

export default {
  'functionCall': (syno: Syno, synoMap: SynoMap) => {
    const callee: FunctionDefinition = synoMap[syno.callee.id];
    return (
      syno.callee !== false &&
      callee.id !== NorPrimitiveId &&
      callee.syntype !== 'functionDefinition' // not used yet
    )
  },
  'argument': (syno: Syno, synoMap: SynoMap) => {
    const functionCall: FunctionCall = synoMap[syno.parent.id];
    const callee: FunctionDefinition = synoMap[functionCall.callee.id];
    return callee.id !== NorPrimitiveId
  },
  'functionDefinition': (syno: Syno, synoMap: SynoMap) => {
    return syno.id !== NorPrimitiveId
  },
  'functionParameter': (syno: Syno, synoMap: SynoMap) => {
    const functionDefinition: FunctionDefinition = synoMap[syno.parent.id];
    return functionDefinition.id !== NorPrimitiveId
  },
  'functionArgument': (syno: Syno, synoMap: SynoMap) => false,
  'variableRef': (syno: Syno, synoMap: SynoMap) => false
}
