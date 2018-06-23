// @flow
import typedKeys from '../../../flow-pacifiers/typed-keys'
import presentSyno from '../present-syno.js'

import type { Syno } from '../../../types/syno.js'
import type { SynoRef } from '../../../types/syno-ref.js'
import type { SynoId } from '../../../types/syno-id.js'
import type { Argumentz } from '../../../types/presentations/argumentz.js'
import type { PresnoMap } from '../../../types/presentations/presno-map.js'

export default (
  presnoMap: PresnoMap,
  parentId: SynoId,
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
      const argPresnoId: SynoId = presentSyno(presnoMap, parentId, argSyno, scope, getSyno, focusNodeId);
      argsPres[argKey] = {
        presnoRef: true,
        id: argPresnoId
      }
    }
  });

  return argsPres;
};
