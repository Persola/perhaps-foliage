import type { SynoRef } from 'perhaps-foliage/dist/types/syntactic/syno-ref';

export type FunctionDefinitionAttrs = {
  syntype: 'functionDefinition';
  name: string;
  body: SynoRef | null;
  parameters: SynoRef[];
};
