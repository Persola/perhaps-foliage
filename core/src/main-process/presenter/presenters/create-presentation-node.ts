import type { StateSelector } from '../../../types/state-selector';
import type { MainsidePresentLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-present-lang-int';
import type { Focus } from '../../../types/editor-state/focus';
import type { Presno } from '../../../types/presenter/presno';
import type { PresnoArgs } from '../../../types/presenter/presno-args';
import type { PresentAndReturnRef } from '../../../types/presenter/present-and-return-ref';

import presentSyno from './present-syno';
import presentNonSynPresno from './present-non-syn-presno';

export default (
  presnoArgs: PresnoArgs,
  state: StateSelector,
  integration: MainsidePresentLangInt,
  focus: Focus,
  presentAndReturnRef: PresentAndReturnRef,
): Presno => {
  if (presnoArgs.type === 'synPresno') {
    return presentSyno(
      presnoArgs.synoId,
      state,
      integration,
      focus,
      presentAndReturnRef,
    );
  }

  if (presnoArgs.type === 'nonSynPresno') {
    return presentNonSynPresno(presnoArgs, focus);
  }

  throw new Error('bad presno prop');
};