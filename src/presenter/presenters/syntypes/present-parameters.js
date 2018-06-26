// @flow
import presentSyno from '../present-syno.js'
import typedValues from '../../../flow-pacifiers/typed-values'

import type { SynoRef } from '../../../types/syno-ref.js'
import type { PresnoMap } from '../../../types/presentations/presno-map.js'
import type { PresnoRef } from '../../../types/presentations/presno-ref.js'
import type { SynoId } from '../../../types/syno-id.js'

export default (
  presnoMap: PresnoMap,
  parentId: SynoId,
  parameters: SynoRef[],
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): PresnoRef[] => {
  return parameters.map((paramRef: SynoRef): PresnoRef => {
    const paramPresnoId: SynoId = presentSyno(presnoMap, parentId, getSyno(paramRef), scope, getSyno, focusNodeId);
    return {
      presnoRef: true,
      id: paramPresnoId
    };
  });
};
