import type { PresnoRef } from 'perhaps-foliage/dist/types/presenter/presno-ref';

export type FunctionCallPresAttrs = {
  readonly syntype: 'functionCall';
  readonly name: (null | string);
  readonly argumentz: PresnoRef[];
  readonly childCallee: (null | PresnoRef);
  readonly resolved: boolean;
};
