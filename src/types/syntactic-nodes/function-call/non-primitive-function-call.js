// @flow
import type { synoRef } from '../../syno-ref'

export type nonPrimitiveFunctionCall = {
  klass: 'functionCall',
  nor: false,
  callee: synoRef,
  argumentz: {[slotName: string]: synoRef}
}
