// @flow
import type { functionParameter } from './function-definition/function-parameter'
import type { functionCall } from './function-call'

export type functionDefinition = {
  klass: 'functionDefinition',
  name: string,
  parameterz: { [slotName: string]: functionParameter },
  body: functionCall
}
