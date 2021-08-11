import type { StateSelector } from 'saliva-repl/dist/types/state-selector';
import type { Syno } from 'saliva-repl/dist/types/syntactic/syno';
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
  argumentRefs: SynoRef[],
  scope: Record<string, unknown>,
  focus: Focus | null,
  presentSyno: PresentSyno,
): PresnoRef[] => {
  return argumentRefs.map((argRef: SynoRef) => {
    const arg: Syno = state.getSyno(argRef.id);

    if (arg.syntype === 'functionParameter') {
      throw new Error('cannot present parameter as argument');
    }

    return {
      presnoRef: true,
      id: presentSyno(
        state,
        integration,
        presnoMap,
        parentId,
        arg,
        scope,
        focus,
        presentSyno,
      ),
    };
  });
};
