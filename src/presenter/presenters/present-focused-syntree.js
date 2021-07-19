// @flow
import ascendToRoot from '../../syntree-utils/ascend-to-root';
import presentSyntree from './present-syntree';

import type { StateSelector } from '../../types/state-selector';
import type { SynoId } from '../../types/syno-id';
import type { Prestree } from '../../types/presenter/prestree';
import type { Focus } from '../../types/editor-state/focus';
import type { PresentLanguageIntegration } from '../../types/language-integration/present-language-integration';

export default (
  state: StateSelector,
  integration: PresentLanguageIntegration,
  focusedPresnoId: SynoId,
  scope: {},
  focus: (Focus | false),
): Prestree => {
  const renderingRootId: SynoId = ascendToRoot(focusedPresnoId, state.synoMap()).id;
  return presentSyntree(
    state,
    integration,
    renderingRootId,
    scope,
    focus,
  );
};
