import presnoId from './presno-id';

import type { NonSynPresnoArgs } from '../../../types/presenter/non-syn-presno-args';
import type { Focus } from '../../../types/editor-state/focus';
import type { NamePartPresAttrs } from '../../../types/presenter/presno-attrs/name-part-attrs';

export default (
  presnoArgs: NonSynPresnoArgs,
  focus: Focus,
): NamePartPresAttrs => {
  // @ts-ignore
  if (presnoArgs.presnoArgs.prestype !== 'NamePart') {
    throw new Error('Name part is the only nonSynPresno');
  }

  const focused = (
    focus.synoId === presnoArgs.parentId
    && focus.presnoIndex === presnoArgs.presnoArgs.presnoIndex
  );

  return {
    id: presnoId(presnoArgs),
    parent: {
      presnoRef: true,
      id: presnoArgs.parentId,
    },
    prestype: 'NamePart',
    focused,
    charFocused: focused ? focus.charIndex : null,
    valid: presnoArgs.presnoArgs.valid,
    namePart: presnoArgs.presnoArgs.text,
  };
};
