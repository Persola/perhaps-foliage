// @flow
import type { functionDefinition } from '../function-definition'
import type { functionArgument } from '../function-call/function-argument'
import type { variableRef } from '../variable-ref'

export type nonPrimitiveFunctionCall = {
  klass: 'functionCall',
  nor: false,
  callee: (functionDefinition | variableRef),
  argumentz: {[slotName: string]: functionArgument}
}
