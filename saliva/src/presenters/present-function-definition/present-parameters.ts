import type { StateSelector } from 'saliva-repl/dist/types/state-selector';
import type { SynoRef } from 'saliva-repl/dist/types/syntactic/syno-ref';
import type { SynoId } from 'saliva-repl/dist/types/syntactic/syno-id';
import type { MutablePresnoMap } from 'saliva-repl/dist/types/presenter/mutable-presno-map';
import type { PresentSyno } from 'saliva-repl/dist/types/presenter/present-syno';
import type { PresnoRef } from 'saliva-repl/dist/types/presenter/presno-ref';
import type { Focus } from 'saliva-repl/dist/types/editor-state/focus';
import type { CoresidePresentLanguageIntegration } from 'saliva-repl/dist/types/language-integration/coreside-present-language-integration';

export default (
  state: StateSelector,
  integration: CoresidePresentLanguageIntegration,
  presnoMap: MutablePresnoMap,
  parentId: SynoId,
  parameterRefs: SynoRef[],
  scope: Record<string, unknown>,
  focus: Focus | null,
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
