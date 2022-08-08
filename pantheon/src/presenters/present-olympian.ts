import type { StateSelector } from 'perhaps-foliage/dist/types/state-selector';
import type { EnstackForPresentation } from 'perhaps-foliage/dist/types/presenter/enstack-for-presentation';

import type { Olympian } from '../types/synos/olympian';
import type { OlympianPresAttrs } from '../types/presentations/presno-attrs/olympian-attrs';

export default (
  olympian: Olympian,
  _: StateSelector,
  enstackForPresentation: EnstackForPresentation,
): OlympianPresAttrs => {
  const name = enstackForPresentation(
    {
      valid: true,
      presnoIndex: 0,
      prestype: 'namePart',
      text: olympian.name,
    },
    olympian,
  );

  return {
    syntype: 'olympian',
    name,
    child: (
      olympian.child
        ? enstackForPresentation(olympian.child)
        : null
    ),
  };
};
