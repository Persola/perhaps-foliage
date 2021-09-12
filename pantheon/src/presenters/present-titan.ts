import makePresnoRef from 'saliva-repl/dist/core-context/presenter/presenters/make-presno-ref';

import type { Titan } from '../types/synos/titan';
import type { TitanPresAttrs } from '../types/presentations/presno-attrs/titan-attrs';

export default (
  titan: Titan,
  // state not needed
): TitanPresAttrs => {
  return {
    syntype: 'titan',
    name: titan.name,
    child: makePresnoRef(titan.child),
  };
};
