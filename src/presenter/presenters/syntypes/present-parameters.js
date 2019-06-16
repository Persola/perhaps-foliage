// @flow
import presentSyno from '../present-syno.js'

import type { SynoRef } from '../../../types/syno-ref.js'
import type { PresnoMap } from '../../../types/presentations/presno-map.js'
import type { PresnoRef } from '../../../types/presentations/presno-ref.js'
import type { SynoId } from '../../../types/syno-id.js'
import type { Focus } from '../../../types/editor-state/focus.js'

export default (
  presnoMap: PresnoMap,
  parentId: SynoId,
  parameters: SynoRef[],
  scope: {},
  getSyno: Function,
  focus: (Focus | false)
): PresnoRef[] => {
  return parameters.map((paramRef: SynoRef): PresnoRef => {
    const paramPresnoId: SynoId = presentSyno(
      presnoMap,
      parentId,
      getSyno(paramRef),
      scope,
      getSyno,
      focus
    );
    return {
      presnoRef: true,
      id: paramPresnoId
    };
  });
};
