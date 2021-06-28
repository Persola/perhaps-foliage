// @flow
import presentSyno from './present-syno.js';

import type { SynoId } from '../../types/syno-id.js';
import type { Prestree } from '../../types/presenter/prestree';
import type { PresnoMap } from '../../types/presenter/presno-map.js';
import type { Focus } from '../../types/editor-state/focus.js';
import type { GrammarName } from '../../types/editor-state/grammar-name.js';

export default (
  grammar: GrammarName,
  rootSynoId: SynoId,
  scope: {},
  getSyno: Function,
  focus: (Focus | false),
): Prestree => {
  const presnoMap: PresnoMap = {};
  presentSyno(
    grammar,
    presnoMap,
    false,
    getSyno({
      synoRef: true,
      id: rootSynoId,
    }),
    scope,
    getSyno,
    focus,
    presentSyno,
  );

  return {
    rootId: rootSynoId,
    presnos: presnoMap,
  };
};
