// @flow
import type { SynoId } from '../../../../types/syno-id'
import type { SynoRef } from '../../../../types/syno-ref'

export type Titan = {
  id: SynoId,
  parent: false,
  child: SynoRef,
  name: string
}
