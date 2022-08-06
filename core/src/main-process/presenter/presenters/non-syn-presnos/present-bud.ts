import presnoId from '../presno-id';

import type { BudPresAttrs } from '../../../../types/presenter/presno-attrs/bud-attrs';
import { BudArgs } from '../../../../types/presenter/presno-args/bud-args';

export default (
  presnoArgs: BudArgs,
  focused: boolean,
): BudPresAttrs => {
  return {
    id: presnoId(presnoArgs),
    parent: {
      presnoRef: true,
      id: presnoArgs.parentId,
    },
    prestype: 'bud',
    focused,
    valid: presnoArgs.valid,
  };
};
