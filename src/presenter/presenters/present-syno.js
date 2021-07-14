// @flow
import salivaPresenters from '../../extension-staging-area/saliva/presenters/presenters.js';
import pantheonPresenters from '../../extension-staging-area/pantheon/presenters/presenters.js';

import type { StateSelector } from '../../types/state-selector.js';
import type { Syno } from '../../types/syno.js';
import type { SynoId } from '../../types/syno-id.js';
import type { Presno } from '../../types/presenter/presno.js';
import type { MutablePresnoMap } from '../../types/presenter/mutable-presno-map.js';
import type { PresentSyno } from '../../types/presenter/present-syno.js';
import type { Focus } from '../../types/editor-state/focus.js';
import type { GrammarName } from '../../types/editor-state/grammar-name.js';

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
