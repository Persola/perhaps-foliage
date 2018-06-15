// @flow
import type { synoRef } from '../../syno-ref'

export type primitiveFunctionCall = {
  klass: 'functionCall',
  nor: true,
  argumentz: {[slotName: string]: synoRef}
}
