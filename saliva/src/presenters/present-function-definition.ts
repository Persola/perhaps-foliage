import type { StateSelector } from 'saliva-repl/dist/types/state-selector';
import type { PresentAndReturnRef } from 'saliva-repl/dist/types/presenter/present-and-return-ref';

import type { FunctionDefinition } from '../types/synos/function-definition';
import type { FunctionDefPresAttrs } from '../types/presentations/presno-attrs/function-definition-attrs';

export default (
  funkshunDef: FunctionDefinition,
  _: StateSelector,
  presentAndReturnRef: PresentAndReturnRef,
): FunctionDefPresAttrs => {
  const name = presentAndReturnRef(
    {
      valid: true,
      presnoIndex: 0,
      prestype: 'NamePart',
      text: funkshunDef.name,
    },
    funkshunDef,
  );

  return {
    syntype: 'functionDefinition',
    name,
    parameters: funkshunDef.parameters.map(paramRef => presentAndReturnRef(paramRef)),
    body: presentAndReturnRef(funkshunDef.body),
  };
};
