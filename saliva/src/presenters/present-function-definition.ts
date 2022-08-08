import type { StateSelector } from 'perhaps-foliage/dist/types/state-selector';
import type { EnstackForPresentation } from 'perhaps-foliage/dist/types/presenter/enstack-for-presentation';

import type { FunctionDefinition } from '../types/synos/function-definition';
import type { FunctionDefPresAttrs } from '../types/presentations/presno-attrs/function-definition-attrs';

export default (
  funkshunDef: FunctionDefinition,
  _: StateSelector,
  enstackForPresentation: EnstackForPresentation,
): FunctionDefPresAttrs => {
  const name = enstackForPresentation(
    {
      valid: true,
      presnoIndex: 0,
      prestype: 'namePart',
      text: funkshunDef.name,
    },
    funkshunDef,
  );

  const body = funkshunDef.body !== null
    ? enstackForPresentation(funkshunDef.body)
    : enstackForPresentation(
      {
        valid: true,
        presnoIndex: funkshunDef.parameters.length + 1,
        prestype: 'bud',
      },
      funkshunDef,
    );

  return {
    syntype: 'functionDefinition',
    name,
    parameters: funkshunDef.parameters.map(paramRef => enstackForPresentation(paramRef)),
    body,
  };
};
