// @flow
import type { synoRef } from '../../syno-ref'

export type nonPrimitiveFunctionCall = {
  id: string,
  parent: synoRef,
  klass: 'functionCall',
  nor: false,
  callee: synoRef,
  argumentz: {[slotName: string]: synoRef}
}
