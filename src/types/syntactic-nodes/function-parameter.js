// @flow
import type { SynoId } from '../syno-id'
import type { SynoRef } from '../syno-ref'
import type { Syntype } from '../syntype.js'

export type FunctionParameter = {
  id: SynoId,
  parent: (SynoRef | false),
  syntype: 'functionParameter',
  name: string,
  valueKlass: Syntype
}
