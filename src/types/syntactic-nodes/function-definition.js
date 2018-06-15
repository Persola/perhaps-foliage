// @flow
import type { synoRef } from '../syno-ref'

export type functionDefinition = {
  klass: 'functionDefinition',
  name: string,
  body: synoRef,
  parameterz: { [slotName: string]: synoRef }
}
