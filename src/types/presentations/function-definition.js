// @flow
import type { synoId } from '../syno-id'
import type { functionParameterPres } from './function-parameter'

export type functionDefPres = {
  syntype: 'functionDefinition',
  synoId: synoId,
  name: string,
  parameterz: functionParameterPres[],
  focused: boolean
}
