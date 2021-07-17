// @flow
import ascendToRoot from '../../syntree-utils/ascend-to-root';
import presentSyntree from './present-syntree';

import type { StateSelector } from '../../types/state-selector';
import type { SynoId } from '../../types/syno-id';
import type { Prestree } from '../../types/presenter/prestree';
import type { Focus } from '../../types/editor-state/focus';
import type { LanguageIntegration } from '../../types/language-integration';

export default (
  state: StateSelector,
  integration: LanguageIntegration,
  focusedPresnoId: SynoId,
  scope: {},
  focus: (Focus | false),
): Prestree => {
  const renderingRootId: SynoId = ascendToRoot(focusedPresnoId, state).id;
  return presentSyntree(
    state,
    integration,
    renderingRootId,
    scope,
    focus,
  );
};
