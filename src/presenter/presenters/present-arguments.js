// @flow
import presentSyno from './present-syno.js'

import type { presentationGraph } from '../../types/presentations/presentation-graph.js' // eslint-disable-line no-unused-vars
import type { synoRef } from '../../types/syno-ref.js' // eslint-disable-line no-unused-vars

export default (
  argumentz:  {[slotName: string]: synoRef},
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): presentationGraph[] => {
  return Object.values(argumentz).map((argRef: synoRef): presentationGraph => {
    return presentSyno(getSyno(argRef), scope, getSyno, focusNodeId);
  });
};
