import type { Scope } from '../../../types/interpreter/scope';

export default (resolvedCallee, interpretedArgs, state): Scope => {
  const interpreteeScope = [];

  const params = resolvedCallee.parameters.map(paramRef => {
    const param = state.getSyno(paramRef.id);

    if (param.syntype !== 'functionParameter') {
      throw new Error('wrong type from synomap (flow)');
    }

    return param;
  });

  params.forEach(param => {
    const matchingPair = interpretedArgs.find(
      argRes => argRes[0].parameter && argRes[0].parameter.id === param.id,
    );

    if (matchingPair === undefined) {
      throw new Error();
    }

    interpreteeScope.push([param, matchingPair[1]]);
  });

  return interpreteeScope;
};
