import type { StateSelector } from '../../../types/state-selector';
import type { MainsidePresentLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-present-lang-int';
import type { Focus } from '../../../types/editor-state/focus';
import type { Presno } from '../../../types/presenter/presnos/presno';
import type { PresnoArgs } from '../../../types/presenter/presno-args';
import type { EnstackForPresentation } from '../../../types/presenter/enstack-for-presentation';

import presentSyno from './present-syno';
import presentNonSyno from './present-non-syno';

export default (
  presnoArgs: PresnoArgs,
  state: StateSelector,
  integration: MainsidePresentLangInt,
  focus: Focus,
  enstackForPresentation: EnstackForPresentation,
): Presno => {
  if (presnoArgs.type === 'synPresno') {
    return presentSyno(
      presnoArgs.synoId,
      state,
      integration,
      focus,
      enstackForPresentation,
    );
  }

  if (presnoArgs.type === 'nonSynPresno') {
    return presentNonSyno(presnoArgs, focus);
  }

  throw new Error('bad presno prop');
};
