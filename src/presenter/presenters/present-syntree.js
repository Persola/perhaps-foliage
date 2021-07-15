// @flow
import presentSyno from './present-syno';

import type { StateSelector } from '../../types/state-selector';
import type { SynoId } from '../../types/syno-id';
import type { Prestree } from '../../types/presenter/prestree';
import type { MutablePresnoMap } from '../../types/presenter/mutable-presno-map';
import type { PresnoMap } from '../../types/presenter/presno-map';
import type { Focus } from '../../types/editor-state/focus';
import type { GrammarName } from '../../types/editor-state/grammar-name';

export default (
  state: StateSelector,
  grammar: GrammarName,
  rootSynoId: SynoId,
  scope: {},
  focus: (Focus | false),
): Prestree => {
  const mutablePresnoMap: MutablePresnoMap = {};
  presentSyno(
    state,
    grammar,
    mutablePresnoMap,
    false,
    state.getSyno(rootSynoId),
    scope,
    focus,
    presentSyno,
  );

  const immutablePresnoMap: PresnoMap = (mutablePresnoMap: any);

  return {
    rootId: rootSynoId,
    presnos: immutablePresnoMap,
  };
};
