// @flow
import type { syntype } from '../syntype.js' // eslint-disable-line no-unused-vars
import type { synoId } from '../syno-id.js' // eslint-disable-line no-unused-vars

export type functionParameterPres = {
  syntype: 'functionParameter',
  synoId: synoId,
  slot: string,
  valueKlass: syntype,
  focused: boolean
}
