// @flow
import type { SynoId } from './syno-id'

export type SynoRef = {
  synoRef: true,
  relation: ('parent' | 'child' | 'non-tree'),
  id: SynoId
}
