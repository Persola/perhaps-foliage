import ascendToRoot from '../../../syntree-utils/ascend-to-root';
import presentSyntree from './present-syntree';

import type { StateSelector } from '../../../types/state-selector';
import type { SynoId } from '../../../types/syntactic/syno-id';
import type { Prestree } from '../../../types/presenter/prestree';
import type { Focus } from '../../../types/editor-state/focus';
import type { CoresidePresentLanguageIntegration } from '../../../types/language-integration/coreside-present-language-integration';

export default (
  state: StateSelector,
  integration: CoresidePresentLanguageIntegration,
  focusedPresnoId: SynoId,
  scope = {},
  focus: Focus | null,
): Prestree => {
  const renderingRootId: SynoId = ascendToRoot(
    focusedPresnoId,
    state.synoMap(),
  ).id;
  return presentSyntree(state, integration, renderingRootId, scope, focus);
};
