// @flow
import salivaPresenters from '../../extension-staging-area/saliva/presenters/presenters';
import pantheonPresenters from '../../extension-staging-area/pantheon/presenters/presenters';

import type { StateSelector } from '../../types/state-selector';
import type { Syno } from '../../types/syno';
import type { SynoId } from '../../types/syno-id';
import type { Presno } from '../../types/presenter/presno';
import type { MutablePresnoMap } from '../../types/presenter/mutable-presno-map';
import type { PresentSyno } from '../../types/presenter/present-syno';
import type { Focus } from '../../types/editor-state/focus';
import type { GrammarName } from '../../types/editor-state/grammar-name';

const PRESENTERS_BY_GRAMMAR = {
  saliva: salivaPresenters,
  pantheon: pantheonPresenters,
};

export default (
  state: StateSelector,
  grammar: GrammarName,
  presnoMap: MutablePresnoMap,
  parentId: (SynoId | false),
  syno: (Syno),
  scope: {},
  focus: (Focus | false),
  presentSyno: PresentSyno,
): SynoId => {
  const grammarPresenters = PRESENTERS_BY_GRAMMAR[grammar];
  if (!(grammarPresenters instanceof Object)) {
    throw new Error(`missing presenters for grammar '${grammar}'`);
  }

  const presenter = grammarPresenters[syno.syntype];
  if (!(presenter instanceof Function)) {
    throw new Error('syno has unrecognized syntype (new type?)');
  }

  const presentationAttrs = presenter(
    state,
    grammar,
    presnoMap,
    syno,
    scope,
    focus,
    presentSyno,
  );

  const parent = !parentId ? false : {
    presnoRef: true,
    id: parentId,
  };

  const presentation: Presno = {
    ...presentationAttrs,
    synoId: syno.id,
    parent,
  };

  if ((typeof presnoMap[presentation.synoId]) !== 'undefined') {
    throw new Error('attempted to overwrite presno!');
  }

  presnoMap[presentation.synoId] = presentation;

  return presentation.synoId;
};
