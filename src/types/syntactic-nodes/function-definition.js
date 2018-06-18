// @flow
import type { synoRef } from '../syno-ref'

export type functionDefinition = {
  id: string,
  parent: synoRef,
  klass: 'functionDefinition',
  name: string,
  body: synoRef,
  parameterz: { [slotName: string]: synoRef }
}
