import presnoId from './presno-id';

import type { EnstackForPresentation } from '../../../types/presenter/enstack-for-presentation';
import type { PresnoRef } from '../../../types/presenter/presno-ref';
import type { PresnoArgs } from '../../../types/presenter/presno-args/presno-args';
import { UnindexedPresnoArgs } from '../../../types/presenter/presno-args/unindexed-presno-args';

const presnoRef = (presnoArgs: PresnoArgs) => {
  return {
    presnoRef: true,
    id: presnoId(presnoArgs),
  };
};

export default (
  stack: PresnoArgs[],
  stub?: true,
): EnstackForPresentation => {
  return (
    presnoIndex: number,
    presnoArgs: UnindexedPresnoArgs,
  ): PresnoRef => {
    const indexed: PresnoArgs = presnoArgs.type === 'synPresno'
      ? presnoArgs
      : {
        ...presnoArgs,
        presnoIndex,
      };

    if (!stub) {
      stack.push(indexed);
    }

    return presnoRef(indexed);
  };
};
