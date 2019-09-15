// @flow
import ascendToRoot from '../../syntree-utils/ascend-to-root.js'
import presentSyntree from './present-syntree.js'

import type { SynoId } from '../../types/syno-id.js'
import type { Prestree } from '../../types/presentations/prestree.js'
import type { Focus } from '../../types/editor-state/focus.js'
import type { Grammar } from '../../types/editor-state/grammar.js'

export default (
  grammar: Grammar,
  focusedPresnoId: SynoId,
  scope: {},
  getSyno: Function,
  focus: (Focus | false)
): Prestree => {
  const renderingRootId: SynoId = ascendToRoot(focusedPresnoId, getSyno).id;
  return presentSyntree(grammar, renderingRootId, scope, getSyno, focus);
}
