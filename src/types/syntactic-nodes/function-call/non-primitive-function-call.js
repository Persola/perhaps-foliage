// @flow
import type { functionDefinition } from '../function-definition'
import type { variableRef } from '../variable-ref'
import type { functionArgument } from './function-argument'

export type nonPrimitiveFunctionCall = {
  klass: 'functionCall',
  nor: false,
  callee: (functionDefinition | variableRef),
  argumentz: functionArgument[]
}
