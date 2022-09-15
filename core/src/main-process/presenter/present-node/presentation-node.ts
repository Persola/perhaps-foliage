import StateSelector from '../../state-interface/state-selector';
import SyntaxTree from '../../state-interface/syntactic-interface/readable/syntax-tree';

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
  tree: SyntaxTree,
  integration: MainsidePresentLangInt,
  focus: Focus | null,
  enstackForPresentation: EnstackForPresentation,
): Presno => {
  if (presnoArgs.type === 'synPresno') {
    return presentSyno(
      presnoArgs,
      state,
      tree,
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
