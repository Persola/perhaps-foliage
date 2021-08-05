import focuses from './helpers/focuses';

import type { StateSelector } from '../../src/types/state-selector';
import type { MutablePresnoMap } from '../../src/types/presenter/mutable-presno-map';
import type { Focus } from '../../src/types/editor-state/focus';
import type { PresentLanguageIntegration } from '../../src/types/language-integration/present-language-integration';
import type { Syno } from '../../src/types/syntactic/syno';
import type { VariableRef } from '../types/synos/variable-ref';
import type { VariableRefPresAttrs } from '../types/presentations/presno-attrs/variable-ref-attrs';
import type { FunctionParameter } from '../types/synos/function-parameter';

export default (
  state: StateSelector,
  integration: PresentLanguageIntegration,
  presnoMap: MutablePresnoMap,
  variableRef: VariableRef,
  scope: Record<string, unknown>,
  focus: Focus | null,
): VariableRefPresAttrs => {
  let valid = true;
  let name: string | null = null;

  if (!variableRef.referent) {
    valid = false;
  } else {
    const referent: Syno = state.getSyno(variableRef.referent.id);
    if (referent.syntype !== 'functionParameter') throw new Error('variable refs can only refer to parameters');
    name = (referent as FunctionParameter).name;
  }

  const { focused, presnoFocused, charFocused } = focuses(
    focus,
    variableRef.id,
  );
  return {
    syntype: 'variableRef',
    valueSyntype: 'booleanLiteral',
    name,
    focused,
    presnoFocused,
    charFocused,
    valid,
  };
};
