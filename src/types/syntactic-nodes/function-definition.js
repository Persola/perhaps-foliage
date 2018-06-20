// @flow
import type { synoId } from '../syno-id'
import type { synoRef } from '../syno-ref'

export type functionDefinition = {
  id: synoId,
  parent: (synoRef | false),
  syntype: 'functionDefinition',
  name: string,
  body: synoRef,
  parameterz: { [slotName: string]: synoRef }
}
