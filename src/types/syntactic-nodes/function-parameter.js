// @flow
import type { synoId } from '../syno-id'
import type { synoRef } from '../syno-ref'
import type { syntype } from '../syntype.js'

export type functionParameter = {
  id: synoId,
  parent: (synoRef | false),
  syntype: 'functionParameter',
  name: string,
  valueKlass: syntype
}
