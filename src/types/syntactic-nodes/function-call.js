// @flow
import type { synoId } from '../syno-id'
import type { synoRef } from '../syno-ref'

export type functionCall = {
  id: synoId,
  parent: (synoRef | false),
  syntype: 'functionCall',
  callee: synoRef,
  argumentz: {[string]: synoRef}
}
