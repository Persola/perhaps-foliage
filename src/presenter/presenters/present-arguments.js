// @flow
import presentSyno from './present-syno.js'
import typedValues from '../../flow-pacifiers/typed-values'

import type { syno } from '../../types/syno.js' // eslint-disable-line no-unused-vars
import type { presentationGraph } from '../../types/presentations/presentation-graph.js' // eslint-disable-line no-unused-vars
import type { synoRef } from '../../types/syno-ref.js' // eslint-disable-line no-unused-vars

export default (
  argumentz: {[slotName: string]: synoRef},
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): presentationGraph[] => {
  return typedValues(argumentz).map((argRef: synoRef): presentationGraph => {
    const argSyno: syno = getSyno(argRef)
    if (argSyno.syntype === 'functionParameter') {
      throw new Error('cannot present parameter as argument');
    } else {
      return presentSyno(argSyno, scope, getSyno, focusNodeId);
    }
  });
};
