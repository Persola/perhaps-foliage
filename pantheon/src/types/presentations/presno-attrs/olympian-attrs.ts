import type { PresnoRef } from 'perhaps-foliage/dist/types/presenter/presno-ref';

export type OlympianPresAttrs = {
  readonly syntype: 'olympian';
  readonly name: (null | PresnoRef);
  readonly child: (null | PresnoRef);
};
