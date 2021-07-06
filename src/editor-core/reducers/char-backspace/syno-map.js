// @flow
import mutateSynoMap from '../state-slice-helpers/syno-map/mutate-syno-map';

import type { SynoMap } from '../../../types/syno-map';
import type { CharBackspace } from '../../../types/actions/char-backspace';
import type { TextHostRefs } from '../../../types/editor-state/text-host-refs.js';
import type { MutableSynoMap } from '../../../types/mutable-syno-map';
import type { MutableSyno } from '../../../types/mutable-syno';

export default (
  oldSynoMap: SynoMap,
  action: CharBackspace,
  textHostRefs: TextHostRefs,
): SynoMap => {
  return mutateSynoMap(oldSynoMap, (newSynoMap: MutableSynoMap) => {
    const focusSyno: MutableSyno = newSynoMap[action.focusSynoId];

    let textHostSyno: MutableSyno;
    if (textHostRefs[focusSyno.syntype] === false) {
      textHostSyno = focusSyno;
    } else {
      const textHostSynoRef = textHostRefs[focusSyno.syntype];
      textHostSyno = newSynoMap[focusSyno[textHostSynoRef].id];
    }

    if (
      textHostSyno.syntype !== 'functionDefinition'
      && textHostSyno.syntype !== 'functionParameter'
    ) {
      throw new Error('text hosts refs lead to syno of wrong type? (flow)');
    }

    textHostSyno.name = (
      textHostSyno.name.slice(0, action.focusCharIndex - 1)
      + textHostSyno.name.slice(action.focusCharIndex, textHostSyno.name.length)
    );

    return newSynoMap;
  });
};
