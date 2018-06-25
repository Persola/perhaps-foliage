// @flow
import type { SynoRef } from '../../syno-ref'
import type { Argument } from '../argument'

export type FunctionCallAttrs = {
  syntype: 'functionCall',
  callee: SynoRef,
  argumentz: {[string]: SynoRef}
}
