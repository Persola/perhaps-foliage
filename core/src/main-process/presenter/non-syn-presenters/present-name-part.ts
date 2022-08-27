import type { NonSynPresnoArgs } from '../../../types/presenter/presno-args/non-syn-presno-args';
import type { NamePartArgs } from '../../../types/presenter/presno-args/name-part-args';
import type { Focus } from '../../../types/editor-state/focus';
import type { NamePartAttrs } from '../../../types/presenter/presnos/non-syn-presnos/attrs/name-part';

export default (
  presnoArgs: NonSynPresnoArgs<NamePartArgs>,
  focused: boolean,
  focus: Focus,
): NamePartAttrs => {
  return {
    prestype: 'namePart',
    charFocused: focused ? focus.charIndex : null,
    namePart: (presnoArgs.nonSynoArgs as NamePartArgs).text,
  };
};
