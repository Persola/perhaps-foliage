// @flow
import type { SynoId } from '../../../../types/syno-id'
import type { SynoRef } from '../../../../types/syno-ref'

export type Olympian = {
  id: SynoId,
  parent: SynoRef,
  name: string
}
