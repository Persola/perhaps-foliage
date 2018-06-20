// @flow
import type { synoId } from '../syno-id'
import type { synoRef } from '../syno-ref'

export type functionParameter = {
  id: synoId,
  parent: (synoRef | false),
  syntype: 'functionParameter',
  name: string,
  valueKlass: string
}
