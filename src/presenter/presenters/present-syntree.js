// @flow
import presentSyno from './present-syno.js'

import type { SynoId } from '../../types/syno-id.js'
import type { Prestree } from '../../types/presentations/prestree.js'
import type { PresnoMap } from '../../types/presentations/presno-map.js'

export default (
  rootSynoId: SynoId,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): Prestree => {
  const presnoMap: PresnoMap = {};
  presentSyno(
    presnoMap,
    false,
    getSyno({
      synoRef: true,
      id: rootSynoId
    }),
    scope,
    getSyno,
    focusNodeId
  );

  return {
    rootId: rootSynoId,
    presnos: presnoMap
  };
}
