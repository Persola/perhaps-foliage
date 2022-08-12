import presentNamePart from '../non-syn-presenters/present-name-part';
import presentBud from '../non-syn-presenters/present-bud';

import type { NonSynPresnoArgs } from '../../../types/presenter/presno-args/non-syn-presno-args';
import type { Focus } from '../../../types/editor-state/focus';
import type { Presno } from '../../../types/presenter/presnos/presno';

export default (
  presnoArgs: NonSynPresnoArgs & { presnoIndex: number },
  focus: Focus,
): Presno => {
  const focused = (
    focus.synoId === presnoArgs.parentId
    && focus.presnoIndex === presnoArgs.presnoIndex
  );

  if (presnoArgs.nonSynoArgs.prestype === 'namePart') {
    return presentNamePart(presnoArgs, focused, focus);
  }

  if (presnoArgs.nonSynoArgs.prestype === 'bud') {
    return presentBud(presnoArgs, focused);
  }

  throw new Error('unrecognized nonSynPresno type');
};
