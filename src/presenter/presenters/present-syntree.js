// @flow
import presentSyno from './present-syno.js'

import type { SynoId } from '../../types/syno-id.js'
import type { Prestree } from '../../types/presentations/prestree.js'
import type { PresnoMap } from '../../types/presentations/presno-map.js'
import type { Focus } from '../../types/editor-state/focus.js'

export default (
  rootSynoId: SynoId,
  scope: {},
  getSyno: Function,
  focus: (Focus | false)
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
    focus
  );

  return {
    rootId: rootSynoId,
    presnos: presnoMap
  };
}
