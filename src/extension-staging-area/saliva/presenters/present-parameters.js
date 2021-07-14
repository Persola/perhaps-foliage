// @flow
import type { StateSelector } from '../../../types/state-selector.js';
import type { SynoRef } from '../../../types/syno-ref.js';
import type { SynoId } from '../../../types/syno-id.js';
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map.js';
import type { PresentSyno } from '../../../types/presenter/present-syno.js';
import type { PresnoRef } from '../../../types/presenter/presno-ref.js';
import type { Focus } from '../../../types/editor-state/focus.js';
import type { GrammarName } from '../../../types/editor-state/grammar-name.js';

export default (
  state: StateSelector,
  grammar: GrammarName,
  presnoMap: MutablePresnoMap,
  parentId: SynoId,
  parameters: SynoRef[],
  scope: {},
  focus: (Focus | false),
  presentSyno: PresentSyno,
): PresnoRef[] => parameters.map((paramRef: SynoRef): PresnoRef => {
  const paramPresnoId: SynoId = presentSyno(
    state,
    grammar,
    presnoMap,
    parentId,
    state.getSyno(paramRef.id),
    scope,
    focus,
    presentSyno,
  );
  return {
    presnoRef: true,
    id: paramPresnoId,
  };
});
