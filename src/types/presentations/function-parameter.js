// @flow
import type { Syntype } from '../syntype.js' // eslint-disable-line no-unused-vars
import type { SynoId } from '../syno-id.js' // eslint-disable-line no-unused-vars

export type FunctionParameterPres = {
  syntype: 'functionParameter',
  synoId: SynoId,
  slot: string,
  valueKlass: Syntype,
  focused: boolean
}
