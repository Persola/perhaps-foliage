// @flow
import type { SynoRef } from '../../syno-ref'

export type FunctionCallAttrs = {
  syntype: 'functionCall',
  callee: SynoRef,
  argumentz: SynoRef[]
}