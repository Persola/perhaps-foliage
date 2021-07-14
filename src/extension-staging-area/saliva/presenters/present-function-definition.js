// @flow
import NorPrimitiveId from '../nor-primitive-id.js';
import presentParameters from './present-parameters.js';

import type { StateSelector } from '../../../types/state-selector.js';
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map.js';
import type { PresentSyno } from '../../../types/presenter/present-syno.js';
import type { PresnoRef } from '../../../types/presenter/presno-ref.js';
import type { Focus } from '../../../types/editor-state/focus.js';
import type { GrammarName } from '../../../types/editor-state/grammar-name.js';
import type { FunctionDefinition } from '../types/synos/function-definition.js';
import type { FunctionDefPresAttrs } from '../types/presentations/presno-attrs/function-definition-attrs.js';

export default (
  state: StateSelector,
  grammar: GrammarName,
  presnoMap: MutablePresnoMap,
  funkshunDef: FunctionDefinition,
  scope: {},
  focus: (Focus | false),
  presentSyno: PresentSyno,
): FunctionDefPresAttrs => {
  let valid = true;
  let body: (PresnoRef | false) = false;
  if (!funkshunDef.body) {
    if (funkshunDef.id !== NorPrimitiveId) {
      valid = false;
    }
  } else {
    body = {
      presnoRef: true,
      id: presentSyno(
        state,
        grammar,
        presnoMap,
        funkshunDef.id,
        state.getSyno(funkshunDef.body.id),
        scope,
        focus,
        presentSyno,
      ),
    };
  }

  return {
    syntype: 'functionDefinition',
    name: funkshunDef.name,
    parameters: presentParameters(
      state,
      grammar,
      presnoMap,
      funkshunDef.id,
      funkshunDef.parameters,
      scope,
      focus,
      presentSyno,
    ),
    focused: focus && (funkshunDef.id === focus.synoId) && (focus.presnoIndex === false),
    presnoFocused: focus && (funkshunDef.id === focus.synoId) && focus.presnoIndex,
    charFocused: focus && (funkshunDef.id === focus.synoId) && focus.charIndex,
    body,
    valid,
  };
};
