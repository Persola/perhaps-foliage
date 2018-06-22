// @flow
import presentSyno from './present-syno.js'
import typedValues from '../../flow-pacifiers/typed-values'

import type { Syno } from '../../types/syno.js' // eslint-disable-line no-unused-vars
import type { PresentationGraph } from '../../types/presentations/presentation-graph.js' // eslint-disable-line no-unused-vars
import type { SynoRef } from '../../types/syno-ref.js' // eslint-disable-line no-unused-vars

export default (
  argumentz: {[slotName: string]: SynoRef},
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): PresentationGraph[] => {
  return typedValues(argumentz).map((argRef: SynoRef): PresentationGraph => {
    const argSyno: Syno = getSyno(argRef)
    if (argSyno.syntype === 'functionParameter') {
      throw new Error('cannot present parameter as argument');
    } else {
      return presentSyno(argSyno, scope, getSyno, focusNodeId);
    }
  });
};
