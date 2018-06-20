// @flow
import type { synoRef } from '../syno-ref'

export type functionParameter = {
  id: string,
  parent: (synoRef | false),
  syntype: 'functionParameter',
  name: string,
  valueKlass: string
}
