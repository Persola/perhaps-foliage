import type { SynoRef } from '../../../../../types/syntactic/syno-ref';

export type FunctionDefinitionAttrs = {
  syntype: 'functionDefinition';
  name: string;
  body: SynoRef | null;
  parameters: SynoRef[];
};
