// @flow
import type { functionArgument } from './function-argument'
import type { nodeRef } from '../node-ref'

export type functionCall = {
  klass: 'functionCall',
  functionRef: nodeRef | 'NOR',
  argumentz: functionArgument[]
}
