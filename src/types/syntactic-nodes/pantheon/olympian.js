// @flow
import type { SynoId } from '../../syno-id'
import type { SynoRef } from '../../syno-ref'

export type Olympian = {
  id: SynoId,
  parent: SynoRef
  name: string
}
