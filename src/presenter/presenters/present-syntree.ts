import presentSyno from './present-syno';
import type { StateSelector } from '../../types/state-selector';
import type { SynoId } from '../../types/syno-id';
import type { Prestree } from '../../types/presenter/prestree';
import type { MutablePresnoMap } from '../../types/presenter/mutable-presno-map';
import type { PresnoMap } from '../../types/presenter/presno-map';
import type { Focus } from '../../types/editor-state/focus';
import type { PresentLanguageIntegration } from '../../types/language-integration/present-language-integration';

export default (
  state: StateSelector,
  integration: PresentLanguageIntegration,
  rootSynoId: SynoId,
  scope: {},
  focus: Focus | null | undefined,
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
  const immutablePresnoMap: PresnoMap = mutablePresnoMap as any;
  return {
    rootId: rootSynoId,
    presnos: immutablePresnoMap,
  };
};
