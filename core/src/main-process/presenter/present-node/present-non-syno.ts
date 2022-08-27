import presentNamePart from '../non-syn-presenters/present-name-part';
import presentBud from '../non-syn-presenters/present-bud';
import presnoId from '../presno-id';

import type { NonSynPresnoArgs } from '../../../types/presenter/presno-args/non-syn-presno-args';
import type { BudArgs } from '../../../types/presenter/presno-args/bud-args';
import type { NamePartArgs } from '../../../types/presenter/presno-args/name-part-args';
import type { Focus } from '../../../types/editor-state/focus';
import type { NonSynPresno } from '../../../types/presenter/presnos/presno';

const prestypeAttrs = (presnoArgs, focused, focus) => {
  if (presnoArgs.nonSynoArgs.prestype === 'namePart') {
    return presentNamePart(presnoArgs, focused, focus);
  }

  if (presnoArgs.nonSynoArgs.prestype === 'bud') {
    return presentBud(presnoArgs);
  }

  throw new Error('unrecognized nonSynPresno type');
};

export default (
  presnoArgs: NonSynPresnoArgs<BudArgs | NamePartArgs>,
  focus: Focus,
): NonSynPresno => {
  const { valid } = presnoArgs.nonSynoArgs;
  const focused = (
    focus.synoId === presnoArgs.parentId
    && focus.presnoIndex === presnoArgs.presnoIndex
  );

  return {
    ...prestypeAttrs(presnoArgs, focused, focus),
    id: presnoId(presnoArgs),
    parent: {
      presnoRef: true,
      id: presnoArgs.parentId,
    },
    valid,
    focused,
    charFocused: focused ? focus.charIndex : null,
  };
};
