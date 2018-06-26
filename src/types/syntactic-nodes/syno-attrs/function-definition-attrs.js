// @flow
import type { SynoRef } from '../../syno-ref'

export type FunctionDefinitionAttrs = {
  syntype: 'functionDefinition',
  name: string,
  body: SynoRef,
  parameters: SynoRef[]
}
