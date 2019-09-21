// @flow
import presentSyno from '../../../presenter/presenters/present-syno.js'

import type { SynoRef } from '../../../types/syno-ref.js'
import type { SynoId } from '../../../types/syno-id.js'
import type { PresnoMap } from '../../../types/presenter/presno-map.js'
import type { PresnoRef } from '../../../types/presenter/presno-ref.js'
import type { Focus } from '../../../types/editor-state/focus.js'
import type { GrammarName } from '../../../types/editor-state/grammar-name.js'

export default (
  grammar: GrammarName,
  presnoMap: PresnoMap,
  parentId: SynoId,
  parameters: SynoRef[],
  scope: {},
  getSyno: Function,
  focus: (Focus | false)
): PresnoRef[] => {
  return parameters.map((paramRef: SynoRef): PresnoRef => {
    const paramPresnoId: SynoId = presentSyno(
      grammar,
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
