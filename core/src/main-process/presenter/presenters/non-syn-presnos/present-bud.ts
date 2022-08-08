import presnoId from '../presno-id';

import type { Bud } from '../../../../types/presenter/presnos/non-syn-presnos/bud';
import { NonSynPresnoArgs } from '../../../../types/presenter/presno-args/non-syn-presno-args';

export default (
  presnoArgs: NonSynPresnoArgs,
  focused: boolean,
): Bud => {
  const { valid } = presnoArgs.presnoArgs;

  return {
    id: presnoId(presnoArgs),
    parent: {
      presnoRef: true,
      id: presnoArgs.parentId,
    },
    prestype: 'bud',
    focused,
    valid,
  };
};
