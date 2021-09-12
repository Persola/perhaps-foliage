import makePresnoRef from 'saliva-repl/dist/core-context/presenter/presenters/make-presno-ref';

import type { StateSelector } from 'saliva-repl/dist/types/state-selector';

import type { Argument } from '../types/synos/argument';
import type { ArgumentPresAttrs } from '../types/presentations/presno-attrs/argument-attrs';

export default (
  argument: Argument,
  state: StateSelector,
): ArgumentPresAttrs => {
  let name = null;

  if (argument.parameter) {
    const param = state.getSyno(argument.parameter.id);

    if (param.syntype !== 'functionParameter') {
      throw new Error('wrong type from synomap (flow)');
    }

    name = param.name;
  }

  const value = (
    argument.value
      ? makePresnoRef(argument.value)
      : null
  );

  return {
    syntype: 'argument',
    name,
    value,
  };
};
