import type { StateSelector } from 'saliva-repl/dist/types/state-selector';
import type { PresentAndReturnRef } from 'saliva-repl/dist/types/presenter/present-and-return-ref';

import type { Titan } from '../types/synos/titan';
import type { TitanPresAttrs } from '../types/presentations/presno-attrs/titan-attrs';

export default (
  titan: Titan,
  _: StateSelector,
  presentAndReturnRef: PresentAndReturnRef,
): TitanPresAttrs => {
  const name = presentAndReturnRef(
    {
      valid: true,
      presnoIndex: 0,
      prestype: 'NamePart',
      text: titan.name,
    },
    titan,
  );

  return {
    syntype: 'titan',
    name,
    child: (
      titan.child
        ? presentAndReturnRef(titan.child)
        : null
    ),
  };
};
