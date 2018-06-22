// @flow
import presentSyno from './present-syno.js'
import typedKeys from '../../flow-pacifiers/typed-keys'

import type { Syno } from '../../types/syno.js'
import type { PresentationGraph } from '../../types/presentations/presentation-graph.js'
import type { SynoRef } from '../../types/syno-ref.js'
import type { Argumentz } from '../../types/presentations/argumentz.js'

export default (
  argumentz: {[slotName: string]: SynoRef},
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): Argumentz => {
  const argsPres = {};
  typedKeys(argumentz).forEach((argKey: string) => {
    const argSyno: Syno = getSyno(argumentz[argKey]);
    if (argSyno.syntype === 'functionParameter') {
      throw new Error('cannot present parameter as argument');
    } else {
      argsPres[argKey] = presentSyno(argSyno, scope, getSyno, focusNodeId);
    }
  });

  return argsPres;
};
