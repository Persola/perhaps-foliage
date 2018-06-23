// @flow
import presentSyno from './present-syno.js'

import type { Syno } from '../../types/syno.js'
import type { SynoId } from '../../types/syno-id.js'
import type { Prestree } from '../../types/presentations/prestree.js'
import type { PresnoMap } from '../../types/presentations/presno-map.js'

export default (
  rootSyno: Syno,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): Prestree => {
  const presnoMap: PresnoMap = {};
  const rootId: SynoId = presentSyno(presnoMap, false, rootSyno, scope, getSyno, focusNodeId);

  return {
    rootId,
    presnos: presnoMap
  };
}
