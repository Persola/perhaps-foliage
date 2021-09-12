import makePresnoRef from 'saliva-repl/dist/core-context/presenter/presenters/make-presno-ref';

import type { FunctionDefinition } from '../types/synos/function-definition';
import type { FunctionDefPresAttrs } from '../types/presentations/presno-attrs/function-definition-attrs';

export default (
  funkshunDef: FunctionDefinition,
  // state not needed
): FunctionDefPresAttrs => {
  return {
    syntype: 'functionDefinition',
    name: funkshunDef.name,
    parameters: funkshunDef.parameters.map(paramRef => makePresnoRef(paramRef)),
    body: makePresnoRef(funkshunDef.body),
  };
};
