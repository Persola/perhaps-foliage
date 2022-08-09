import type { PresnoRef } from 'perhaps-foliage/dist/types/presenter/presno-ref';

export type ArgumentPresAttrs = {
  readonly syntype: 'argument';
  readonly name: (null | string);
  readonly value: (null | PresnoRef);
};
