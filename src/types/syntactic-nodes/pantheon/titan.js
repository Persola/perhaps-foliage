// @flow
import type { SynoId } from '../../syno-id'
import type { SynoRef } from '../../syno-ref'

export type Titan = {
  id: SynoId,
  parent: false,
  child: SynoRef,
  name: string
}
