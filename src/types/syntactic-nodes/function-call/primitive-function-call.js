// @flow
import type { synoRef } from '../../syno-ref'

export type primitiveFunctionCall = {
  id: string,
  parent: synoRef,
  klass: 'functionCall',
  nor: true,
  argumentz: {[slotName: string]: synoRef}
}
