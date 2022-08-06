import presnoId from '../presno-id';

import type { NamePartPresAttrs } from '../../../../types/presenter/presno-attrs/name-part-attrs';
import { NamePartArgs } from '../../../../types/presenter/presno-args/name-part-args';

export default (
  presnoArgs: NamePartArgs,
  focused: boolean,
): NamePartPresAttrs => {
  return {
    id: presnoId(presnoArgs),
    parent: {
      presnoRef: true,
      id: presnoArgs.parentId,
    },
    prestype: 'NamePart',
    focused,
    charFocused: focused ? focus.charIndex : null,
    valid: presnoArgs.valid,
    namePart: presnoArgs.text,
  };
};
