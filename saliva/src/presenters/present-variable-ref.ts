import type { StateSelector } from 'saliva-repl/dist/types/state-selector';
import type { MutablePresnoMap } from 'saliva-repl/dist/types/presenter/mutable-presno-map';
import type { Focus } from 'saliva-repl/dist/types/editor-state/focus';
import type { CoresidePresentLanguageIntegration } from 'saliva-repl/dist/types/language-integration/coreside-present-language-integration';
import type { Syno } from 'saliva-repl/dist/types/syntactic/syno';

import type { VariableRef } from '../types/synos/variable-ref';
import type { VariableRefPresAttrs } from '../types/presentations/presno-attrs/variable-ref-attrs';
import type { FunctionParameter } from '../types/synos/function-parameter';

export default (
  state: StateSelector,
  integration: CoresidePresentLanguageIntegration,
  presnoMap: MutablePresnoMap,
  variableRef: VariableRef,
  scope: Record<string, unknown>,
  focus: Focus | null,
): VariableRefPresAttrs => {
  let name: string | null = null;

  if (variableRef.referent) {
    const referent: Syno = state.getSyno(variableRef.referent.id);
    if (referent.syntype !== 'functionParameter') throw new Error('variable refs can only refer to parameters');
    name = (referent as FunctionParameter).name;
  }

  return {
    syntype: 'variableRef',
    valueSyntype: 'booleanLiteral',
    name,
  };
};
