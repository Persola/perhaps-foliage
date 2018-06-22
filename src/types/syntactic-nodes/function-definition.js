// @flow
import type { SynoId } from '../syno-id'
import type { SynoRef } from '../syno-ref'

export type FunctionDefinition = {
  id: SynoId,
  parent: (SynoRef | false),
  syntype: 'functionDefinition',
  name: string,
  body: SynoRef,
  parameterz: { [slotName: string]: SynoRef }
}
