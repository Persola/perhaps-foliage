// @flow
import type { Syntype } from '../syntype.js'
import type { SynoId } from '../syno-id.js'

export type FunctionParameterPres = {
  syntype: 'functionParameter',
  synoId: SynoId,
  slot: string,
  valueSyntype: Syntype,
  focused: boolean
}
