import type { NonSynPresnoArgs } from '../../../types/presenter/presno-args/non-syn-presno-args';
import type { BudArgs } from '../../../types/presenter/presno-args/bud-args';
import type { BudAttrs } from '../../../types/presenter/presnos/non-syn-presnos/attrs/bud';

export default (
  presnoArgs: NonSynPresnoArgs<BudArgs>,
): BudAttrs => {
  return {
    prestype: 'bud',
    expectedSyntype: presnoArgs.nonSynoArgs.expectedSyntype,
  };
};
