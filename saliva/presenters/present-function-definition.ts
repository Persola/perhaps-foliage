import type { StateSelector } from 'saliva-repl/dist/types/state-selector';
import type { MutablePresnoMap } from 'saliva-repl/dist/types/presenter/mutable-presno-map';
import type { PresentSyno } from 'saliva-repl/dist/types/presenter/present-syno';
import type { PresnoRef } from 'saliva-repl/dist/types/presenter/presno-ref';
import type { Focus } from 'saliva-repl/dist/types/editor-state/focus';
import type { CoresidePresentLanguageIntegration } from 'saliva-repl/dist/types/language-integration/coreside-present-language-integration';

// @ts-ignore how do I configure TS to ignore webpacked imports?
import primitives from '../primitives.yml';
import focuses from './helpers/focuses';
import presentParameters from './present-function-definition/present-parameters';

import type { FunctionDefinition } from '../types/synos/function-definition';
import type { FunctionDefPresAttrs } from '../types/presentations/presno-attrs/function-definition-attrs';

const primitiveIds = Object.keys(primitives);
export default (
  state: StateSelector,
  integration: CoresidePresentLanguageIntegration,
  presnoMap: MutablePresnoMap,
  funkshunDef: FunctionDefinition,
  scope: Record<string, unknown>,
  focus: Focus | null,
  presentSyno: PresentSyno,
): FunctionDefPresAttrs => {
  let valid = true;
  let body: PresnoRef | null = null;

  if (!funkshunDef.body) {
    if (!primitiveIds.includes(funkshunDef.id)) {
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

  const { focused, presnoFocused, charFocused } = focuses(
    focus,
    funkshunDef.id,
  );
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
    focused,
    presnoFocused,
    charFocused,
    body,
    valid,
  };
};
