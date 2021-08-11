import presentSyno from './present-syno';

import type { StateSelector } from '../../types/state-selector';
import type { SynoId } from '../../types/syntactic/syno-id';
import type { Prestree } from '../../types/presenter/prestree';
import type { MutablePresnoMap } from '../../types/presenter/mutable-presno-map';
import type { PresnoMap } from '../../types/presenter/presno-map';
import type { Focus } from '../../types/editor-state/focus';
import type { CoresidePresentLanguageIntegration } from '../../types/language-integration/coreside-present-language-integration';

export default (
  state: StateSelector,
  integration: CoresidePresentLanguageIntegration,
  rootSynoId: SynoId,
  scope = {},
  focus: Focus | null,
): Prestree => {
  const mutablePresnoMap: MutablePresnoMap = {};
  presentSyno(
    state,
    integration,
    mutablePresnoMap,
    null,
    state.getSyno(rootSynoId),
    scope,
    focus,
    presentSyno,
  );
  const immutablePresnoMap = mutablePresnoMap as PresnoMap;
  return {
    rootId: rootSynoId,
    presnos: immutablePresnoMap,
  };
};
