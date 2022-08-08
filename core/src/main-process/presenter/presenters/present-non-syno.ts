import presentNamePart from './non-syn-presnos/present-name-part';
import presentBud from './non-syn-presnos/present-bud';

import type { NonSynPresnoArgs } from '../../../types/presenter/presno-args/non-syn-presno-args';
import type { Focus } from '../../../types/editor-state/focus';
import type { Presno } from '../../../types/presenter/presnos/presno';

export default (
  presnoArgs: NonSynPresnoArgs,
  focus: Focus,
): Presno => {
  const focused = (
    focus.synoId === presnoArgs.parentId
    && focus.presnoIndex === presnoArgs.presnoArgs.presnoIndex
  );

  if (presnoArgs.presnoArgs.prestype === 'namePart') {
    return presentNamePart(presnoArgs, focused, focus);
  }

  if (presnoArgs.presnoArgs.prestype === 'bud') {
    return presentBud(presnoArgs, focused);
  }

  throw new Error('unrecognized nonSynPresno type');
};
