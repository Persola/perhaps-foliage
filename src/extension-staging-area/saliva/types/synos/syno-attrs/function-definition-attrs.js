// @flow
import type { SynoRef } from '../../../../../types/syno-ref';

export type FunctionDefinitionAttrs = {|
  syntype: 'functionDefinition',
  name: string,
  body: ?SynoRef,
  parameters: SynoRef[],
|}
