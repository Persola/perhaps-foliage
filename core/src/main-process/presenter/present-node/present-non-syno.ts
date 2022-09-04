import presentNamePart from '../non-syn-presenters/present-name-part';
import presentGap from '../non-syn-presenters/present-gap';
import presentBud from '../non-syn-presenters/present-bud';
import presnoId from '../presno-id';

import type { NonSynPresnoArgs } from '../../../types/presenter/presno-args/non-syn-presno-args';
import type { GapArgs } from '../../../types/presenter/presno-args/gap-args';
import type { BudArgs } from '../../../types/presenter/presno-args/bud-args';
import type { NamePartArgs } from '../../../types/presenter/presno-args/name-part-args';
import type { Focus } from '../../../types/editor-state/focus';
import type { NonSynPresno } from '../../../types/presenter/presnos/presno';

const prestypeAttrs = (presnoArgs, focused, focus) => {
  const { prestype } = presnoArgs.nonSynoArgs;

  if (prestype === 'namePart') {
    return presentNamePart(presnoArgs, focused, focus);
  }

  if (prestype === 'gap') {
    return presentGap(presnoArgs);
  }

  if (prestype === 'bud') {
    return presentBud();
  }

  throw new Error(`Unrecognized nonSynPresno type '${prestype}'`);
};

export default (
  presnoArgs: NonSynPresnoArgs<GapArgs | BudArgs | NamePartArgs>,
  focus: Focus,
): NonSynPresno => {
  const { valid } = presnoArgs.nonSynoArgs;
  const focused = (
    focus.synoId === presnoArgs.parentId
    && (
      focus.presnoIndex === presnoArgs.presnoIndex
      || presnoArgs.nonSynoArgs.prestype === 'bud'
    )
  );

  return {
    ...prestypeAttrs(presnoArgs, focused, focus),
    id: presnoId(presnoArgs),
    parent: {
      presnoRef: true,
      id: String(presnoArgs.parentId),
    },
    valid,
    focused,
    charFocused: focused ? focus.charIndex : null,
  };
};
