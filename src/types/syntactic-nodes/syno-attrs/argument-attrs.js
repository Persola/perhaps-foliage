// @flow
import type { SynoRef } from '../../syno-ref'
import type { Syntype } from '../../syntype'

export type ArgumentAttrs = {
  syntype: 'argument',
  valueSyntype: ?Syntype,
  value: SynoRef,
  parameter: SynoRef // ! this is not a child in the syntree, just a ref !
}
