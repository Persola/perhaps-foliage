// @flow
import type { functionArgument } from './function-argument'
import type { nodeRef } from '../../node-ref'

export type nonPrimitiveFunctionCall = {
  klass: 'functionCall',
  nor: false,
  functionRef: nodeRef,
  argumentz: functionArgument[]
}
