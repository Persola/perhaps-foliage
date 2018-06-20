// @flow
import type { synoId } from '../syno-id'
import type { synoRef } from '../syno-ref'

export type coreSynoAttrs = {
  id: synoId,
  parent: (synoRef | false)
}
