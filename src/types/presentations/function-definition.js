// @flow
import type { SynoId } from '../syno-id'
import type { FunctionParameterPres } from './function-parameter'
import type { Presno } from './presno'

export type FunctionDefPres = {
  syntype: 'functionDefinition',
  synoId: SynoId,
  name: string,
  parameters: FunctionParameterPres[],
  focused: boolean,
  body: Presno
}
