import StateSelector from '../../selectors/state-selector';

import presentSyno from './present-syno';
import presentNonSyno from './present-non-syno';

import type { MainsidePresentLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-present-lang-int';
import type { Focus } from '../../../types/editor-state/focus';
import type { Presno } from '../../../types/presenter/presnos/presno';
import type { PresnoArgs } from '../../../types/presenter/presno-args/presno-args';
import type { EnstackForPresentation } from '../../../types/presenter/enstack-for-presentation';

export default (
  presnoArgs: PresnoArgs,
  state: StateSelector,
  integration: MainsidePresentLangInt,
  focus: Focus,
  enstackForPresentation: EnstackForPresentation,
): Presno => {
  if (presnoArgs.type === 'synPresno') {
    return presentSyno(
      presnoArgs,
      state,
      integration,
      focus,
      enstackForPresentation,
    );
  }

  if (presnoArgs.type === 'nonSynPresno') {
    return presentNonSyno(
      presnoArgs,
      focus,
    );
  }

  throw new Error('Bad presno args');
};
