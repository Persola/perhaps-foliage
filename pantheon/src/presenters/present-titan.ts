import type { StateSelector } from 'perhaps-foliage/dist/types/state-selector';
import type { EnstackForPresentation } from 'perhaps-foliage/dist/types/presenter/enstack-for-presentation';

import type { Titan } from '../types/synos/titan';
import type { TitanPresAttrs } from '../types/presentations/presno-attrs/titan-attrs';

export default (
  titan: Titan,
  _: StateSelector,
  enstackForPresentation: EnstackForPresentation,
): TitanPresAttrs => {
  const name = enstackForPresentation(
    {
      valid: true,
      presnoIndex: 0,
      prestype: 'namePart',
      text: titan.name,
    },
    titan,
  );

  return {
    syntype: 'titan',
    name,
    child: (
      titan.child
        ? enstackForPresentation(titan.child)
        : null
    ),
  };
};
