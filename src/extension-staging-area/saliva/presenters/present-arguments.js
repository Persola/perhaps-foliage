// @flow
import type { Syno } from '../../../types/syno.js';
import type { SynoRef } from '../../../types/syno-ref.js';
import type { SynoId } from '../../../types/syno-id.js';
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map.js';
import type { PresentSyno } from '../../../types/presenter/present-syno.js';
import type { PresnoRef } from '../../../types/presenter/presno-ref.js';
import type { Focus } from '../../../types/editor-state/focus.js';
import type { GrammarName } from '../../../types/editor-state/grammar-name.js';

export default (
  grammar: GrammarName,
  presnoMap: MutablePresnoMap,
  parentId: SynoId,
  argumentz: SynoRef[],
  scope: {},
  getSyno: Function,
  focus: (Focus | false),
  presentSyno: PresentSyno,
): PresnoRef[] => {
  const argsPres = [];
  argumentz.forEach((argRef: SynoRef) => {
    const arg: Syno = getSyno(argRef);
    if (arg.syntype === 'functionParameter') {
      throw new Error('cannot present parameter as argument');
    } else {
      const argPresnoId: SynoId = presentSyno(
        grammar,
        presnoMap,
        parentId,
        arg,
        scope,
        getSyno,
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
