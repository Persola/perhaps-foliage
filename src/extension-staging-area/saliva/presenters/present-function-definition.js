// @flow
import NorPrimitiveId from '../nor-primitive-id';
import presentParameters from './present-parameters';

import type { StateSelector } from '../../../types/state-selector';
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map';
import type { PresentSyno } from '../../../types/presenter/present-syno';
import type { PresnoRef } from '../../../types/presenter/presno-ref';
import type { Focus } from '../../../types/editor-state/focus';
import type { PresentLanguageIntegration } from '../../../types/language-integration/present-language-integration';
import type { FunctionDefinition } from '../types/synos/function-definition';
import type { FunctionDefPresAttrs } from '../types/presentations/presno-attrs/function-definition-attrs';

export default (
  state: StateSelector,
  integration: PresentLanguageIntegration,
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
        integration,
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
      integration,
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
