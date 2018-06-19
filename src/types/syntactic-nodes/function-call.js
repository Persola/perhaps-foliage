// @flow
import type { synoRef } from '../syno-ref'

export type functionCall = {
  id: string,
  parent: synoRef,
  syntype: 'functionCall',
  callee: synoRef,
  argumentz: {[string]: synoRef}
}
