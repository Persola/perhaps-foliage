import presentNamePart from './non-syn-presnos/present-name-part';
import presentBud from './non-syn-presnos/present-bud';

import type { NonSynPresnoArgs } from '../../../types/presenter/presno-args/non-syn-presno-args';
import { NamePartArgs } from '../../../types/presenter/presno-args/name-part-args';
import { BudArgs } from '../../../types/presenter/presno-args/bud-args';
import type { Focus } from '../../../types/editor-state/focus';
import type { PresnoAttrs } from '../../../types/presenter/presno-attrs/presno-attrs';

export default (
  presnoArgs: NonSynPresnoArgs,
  focus: Focus,
): PresnoAttrs => {
  const focused = (
    focus.synoId === presnoArgs.parentId
    && focus.presnoIndex === presnoArgs.presnoArgs.presnoIndex
  );

  if (presnoArgs.presnoArgs.prestype === 'NamePart') {
    return presentNamePart(presnoArgs.presnoArgs as NamePartArgs, focused);
  }

  if (presnoArgs.presnoArgs.prestype === 'Bud') {
    return presentBud(presnoArgs.presnoArgs as BudArgs, focused);
  }

  throw new Error('unrecognized nonSynPresno type');
};
