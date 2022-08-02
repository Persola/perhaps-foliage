import type { StateSelector } from 'perhaps-foliage/dist/types/state-selector';
import type { PresentAndReturnRef } from 'perhaps-foliage/dist/types/presenter/present-and-return-ref';

import type { Olympian } from '../types/synos/olympian';
import type { OlympianPresAttrs } from '../types/presentations/presno-attrs/olympian-attrs';

export default (
  olympian: Olympian,
  _: StateSelector,
  presentAndReturnRef: PresentAndReturnRef,
): OlympianPresAttrs => {
  const name = presentAndReturnRef(
    {
      valid: true,
      presnoIndex: 0,
      prestype: 'NamePart',
      text: olympian.name,
    },
    olympian,
  );

  return {
    syntype: 'olympian',
    name,
    child: (
      olympian.child
        ? presentAndReturnRef(olympian.child)
        : null
    ),
  };
};
