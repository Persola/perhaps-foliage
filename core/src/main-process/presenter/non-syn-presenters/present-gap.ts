import type { NonSynPresnoArgs } from '../../../types/presenter/presno-args/non-syn-presno-args';
import type { GapArgs } from '../../../types/presenter/presno-args/gap-args';
import type { GapAttrs } from '../../../types/presenter/presnos/non-syn-presnos/attrs/gap';

export default (
  presnoArgs: NonSynPresnoArgs<GapArgs>,
): GapAttrs => {
  return {
    prestype: 'gap',
    expectedSyntype: presnoArgs.nonSynoArgs.expectedSyntype,
  };
};
