// @flow
import type { functionArgument } from './function-argument'
import type { nodeRef } from '../../node-ref'

export type nonPrimitiveFunctionCall = {
  klass: 'functionCall',
  nor: false,
  callee: nodeRef,
  argumentz: functionArgument[]
}
