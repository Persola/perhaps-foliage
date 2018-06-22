// @flow
import type { SynoId } from '../syno-id'
import type { SynoRef } from '../syno-ref'

export type CoreSynoAttrs = {
  id: SynoId,
  parent: (SynoRef | false)
}
