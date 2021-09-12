import makePresnoRef from 'saliva-repl/dist/core-context/presenter/presenters/make-presno-ref';

import type { Olympian } from '../types/synos/olympian';
import type { OlympianPresAttrs } from '../types/presentations/presno-attrs/olympian-attrs';

export default (
  olympian: Olympian,
  // state not needed
): OlympianPresAttrs => {
  let child = null;

  if (olympian.child) {
    child = makePresnoRef(olympian.child);
  }

  return {
    syntype: 'olympian',
    name: olympian.name,
    child,
  };
};
