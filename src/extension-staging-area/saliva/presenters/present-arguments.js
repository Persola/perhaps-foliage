// @flow
import type { StateSelector } from '../../../types/state-selector';
import type { Syno } from '../../../types/syno';
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
  argumentz: SynoRef[],
  scope: {},
  focus: (Focus | false),
  presentSyno: PresentSyno,
): PresnoRef[] => {
  const argsPres = [];
  argumentz.forEach((argRef: SynoRef) => {
    const arg: Syno = state.getSyno(argRef.id);
    if (arg.syntype === 'functionParameter') {
      throw new Error('cannot present parameter as argument');
    } else {
      const argPresnoId: SynoId = presentSyno(
        state,
        integration,
        presnoMap,
        parentId,
        arg,
        scope,
        focus,
        presentSyno,
      );
      argsPres.push({
        presnoRef: true,
        id: argPresnoId,
      });
    }
  });

  return argsPres;
};
