// @flow
import type { SynoId } from '../../../../types/syno-id'
import type { SynoRef } from '../../../../types/syno-ref'

export type CoreSynoAttrs = {
  id: SynoId,
  parent: (SynoRef | false)
}
