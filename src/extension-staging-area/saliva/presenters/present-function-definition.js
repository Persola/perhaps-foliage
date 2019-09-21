// @flow
import presentSyno from '../../../presenter/presenters/present-syno.js'

import NorPrimitiveId from '../nor-primitive-id.js'
import presentParameters from './present-parameters.js'

import type { SynoId } from '../../../types/syno-id'
import type { PresnoMap } from '../../../types/presenter/presno-map.js'
import type { PresnoRef } from '../../../types/presenter/presno-ref.js'
import type { Focus } from '../../../types/editor-state/focus.js'
import type { GrammarName } from '../../../types/editor-state/grammar-name.js'
import type { FunctionDefinition } from '../types/synos/function-definition.js'
import type { FunctionDefPresAttrs } from '../types/presentations/presno-attrs/function-definition-attrs.js'

export default (
  grammar: GrammarName,
  presnoMap: PresnoMap,
  funkshunDef: FunctionDefinition,
  scope: {},
  getSyno: Function,
  focus: (Focus | false)
): FunctionDefPresAttrs => {
  let valid = true;
  let body: (PresnoRef | false)  = false;
  if (!funkshunDef.body) {
    if (funkshunDef.id !== NorPrimitiveId) {
      valid = false;
    }
  } else {
    body = {
      presnoRef: true,
      id: presentSyno(
        grammar,
        presnoMap,
        funkshunDef.id,
        getSyno(funkshunDef.body),
        scope,
        getSyno,
        focus
      )
    };
  }

  return {
    syntype: 'functionDefinition',
    name: funkshunDef.name,
    parameters: presentParameters(
      grammar,
      presnoMap,
      funkshunDef.id,
      funkshunDef.parameters,
      scope,
      getSyno,
      focus
    ),
    focused: focus && (funkshunDef.id === focus.synoId) && (focus.presnoIndex === false),
    presnoFocused: focus && (funkshunDef.id === focus.synoId) && focus.presnoIndex,
    charFocused: focus && (funkshunDef.id === focus.synoId) && focus.charIndex,
    body,
    valid
  }
}
