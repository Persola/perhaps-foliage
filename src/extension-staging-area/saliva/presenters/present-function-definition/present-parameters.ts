import type { StateSelector } from '../../../../types/state-selector';
import type { SynoRef } from '../../../../types/syno-ref';
import type { SynoId } from '../../../../types/syno-id';
import type { MutablePresnoMap } from '../../../../types/presenter/mutable-presno-map';
import type { PresentSyno } from '../../../../types/presenter/present-syno';
import type { PresnoRef } from '../../../../types/presenter/presno-ref';
import type { Focus } from '../../../../types/editor-state/focus';
import type { PresentLanguageIntegration } from '../../../../types/language-integration/present-language-integration';

export default (
  state: StateSelector,
  integration: PresentLanguageIntegration,
  presnoMap: MutablePresnoMap,
  parentId: SynoId,
  parameterRefs: SynoRef[],
  scope: {},
  focus: Focus | null | undefined,
  presentSyno: PresentSyno,
): PresnoRef[] => {
  return parameterRefs.map(paramRef => {
    return {
      presnoRef: true,
      id: presentSyno(
        state,
        integration,
        presnoMap,
        parentId,
        state.getSyno(paramRef.id),
        scope,
        focus,
        presentSyno,
      ),
    };
  });
};
