// @flow
import type { SynoId } from '../syno-id'
import type { SynoRef } from '../syno-ref'

export type FunctionCall = {
  id: SynoId,
  parent: (SynoRef | false),
  syntype: 'functionCall',
  callee: SynoRef,
  argumentz: {[string]: SynoRef}
}
