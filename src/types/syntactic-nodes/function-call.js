// @flow
import type { functionArgument } from './function-argument'

export type functionCall = {
  klass: 'functionCall',
  functionRef: number,
  arguments: functionArgument[]
}
