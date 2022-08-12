import presnoId from '../presno-id';

import type { NamePart } from '../../../types/presenter/presnos/non-syn-presnos/name-part';
import { Focus } from '../../../types/editor-state/focus';
import { NonSynPresnoArgs } from '../../../types/presenter/presno-args/non-syn-presno-args';
import { NamePartArgs } from '../../../types/presenter/presno-args/name-part-args';

export default (
  presnoArgs: NonSynPresnoArgs,
  focused: boolean,
  focus: Focus,
): NamePart => {
  const { valid } = presnoArgs.nonSynoArgs;

  return {
    id: presnoId(presnoArgs),
    parent: {
      presnoRef: true,
      id: presnoArgs.parentId,
    },
    prestype: 'namePart',
    focused,
    charFocused: focused ? focus.charIndex : null,
    valid,
    namePart: (presnoArgs.nonSynoArgs as NamePartArgs).text,
  };
};
