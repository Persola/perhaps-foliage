// @flow
import type { SynoRef } from '../../syno-ref'
import type { Syntype } from '../../syntype'

export type ArgumentAttrs = {
  syntype: 'argument',
  name: string,
  valueSyntype: ?Syntype,
  value: SynoRef
}
