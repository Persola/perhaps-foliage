// @flow
import type { StateSelector } from '../../../types/state-selector';
import type { SynoRef } from '../../../types/syno-ref';
import type { SynoId } from '../../../types/syno-id';
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map';
import type { PresentSyno } from '../../../types/presenter/present-syno';
import type { PresnoRef } from '../../../types/presenter/presno-ref';
import type { Focus } from '../../../types/editor-state/focus';
import type { LanguageIntegration } from '../../../types/language-integration';

export default (
  state: StateSelector,
  integration: LanguageIntegration,
  presnoMap: MutablePresnoMap,
  parentId: SynoId,
  parameters: SynoRef[],
  scope: {},
  focus: (Focus | false),
  presentSyno: PresentSyno,
): PresnoRef[] => parameters.map((paramRef: SynoRef): PresnoRef => {
  const paramPresnoId: SynoId = presentSyno(
    state,
    integration,
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
