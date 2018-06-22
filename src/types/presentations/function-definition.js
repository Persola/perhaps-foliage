// @flow
import type { Syno } from '../syno'
import type { SynoId } from '../syno-id'
import type { FunctionParameterPres } from './function-parameter'

export type FunctionDefPres = {
  syntype: 'functionDefinition',
  synoId: SynoId,
  name: string,
  parameterz: FunctionParameterPres[],
  focused: boolean,
  body: Syno
}
