import type { StateSelector } from '../../../../types/state-selector';
import type { Syno } from '../../../../types/syntactic/syno';
import type { SynoRef } from '../../../../types/syntactic/syno-ref';
import type { SynoId } from '../../../../types/syntactic/syno-id';
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
