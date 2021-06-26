// @flow
import salivaPresenters from '../../extension-staging-area/saliva/presenters/presenters.js'
import pantheonPresenters from '../../extension-staging-area/pantheon/presenters/presenters.js'

import type { Syno } from '../../types/syno.js'
import type { SynoId } from '../../types/syno-id.js'
import type { Presno } from '../../types/presenter/presno.js'
import type { PresnoMap } from '../../types/presenter/presno-map.js'
import type { Focus } from '../../types/editor-state/focus.js'
import type { GrammarName } from '../../types/editor-state/grammar-name.js'

const PRESENTERS_BY_GRAMMAR = {
  'saliva': salivaPresenters,
  'pantheon': pantheonPresenters
};

export default (
  grammar: GrammarName,
  presnoMap: PresnoMap,
  parentId: (SynoId | false),
  syno: (Syno),
  scope: {},
  getSyno: Function,
  focus: (Focus | false)
): SynoId => {
  let presentationAttrs: {};
  const grammarPresenters = PRESENTERS_BY_GRAMMAR[grammar];
  if (!(grammarPresenters instanceof Object)) {
    throw new Error(`missing presenters for grammar '${grammar}'`);
  }

  const presenter = grammarPresenters[syno.syntype];
  if (!(presenter instanceof Function)) {
    throw new Error('syno has unrecognized syntype (new type?)');
  }

  presentationAttrs = presenter(grammar, presnoMap, syno, scope, getSyno, focus);

  const parent = !parentId ? false : {
    presnoRef: true,
    id: parentId
  };

  const presentation: Presno = Object.assign({}, presentationAttrs, {
    synoId: syno.id,
    parent
  });

  if ((typeof presnoMap[presentation.synoId]) !== 'undefined' ) {
    throw new Error('attempted to overwrite presno!');
  }

  presnoMap[presentation.synoId] = presentation;

  return presentation.synoId;
}
