// @flow
import presentSyno from '../present-syno.js'

import type { Syno } from '../../../types/syno.js'
import type { SynoRef } from '../../../types/syno-ref.js'
import type { SynoId } from '../../../types/syno-id.js'
import type { PresnoMap } from '../../../types/presentations/presno-map.js'
import type { PresnoRef } from '../../../types/presentations/presno-ref.js'

export default (
  presnoMap: PresnoMap,
  parentId: SynoId,
  argumentz: SynoRef[],
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): PresnoRef[] => {
  const argsPres = [];
  argumentz.forEach((argRef: SynoRef) => {
    const arg: Syno = getSyno(argRef);
    if (arg.syntype === 'functionParameter') {
      throw new Error('cannot present parameter as argument');
    } else {
      const argPresnoId: SynoId = presentSyno(presnoMap, parentId, arg, scope, getSyno, focusNodeId);
      argsPres.push({
        presnoRef: true,
        id: argPresnoId
      })
    }
  });

  return argsPres;
};
