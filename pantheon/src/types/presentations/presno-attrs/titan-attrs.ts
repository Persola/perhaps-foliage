import type { PresnoRef } from 'perhaps-foliage/dist/types/presenter/presno-ref';

export type TitanPresAttrs = {
  readonly syntype: 'titan';
  readonly name: (null | PresnoRef);
  readonly child: (null | PresnoRef);
};
