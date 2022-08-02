import type { PresnoRef } from 'perhaps-foliage/dist/types/presenter/presno-ref';

export type FunctionCallPresAttrs = {
  readonly syntype: 'functionCall';
  readonly name: (null | PresnoRef);
  readonly argumentz: PresnoRef[];
  readonly callee: (null | PresnoRef);
  readonly resolved: boolean;
};
