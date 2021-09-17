import presnoId from './presno-id';

import type { PresentAndReturnRef } from '../../../types/presenter/present-and-return-ref';
import type { SynoRef } from '../../../types/syntactic/syno-ref';
import type { PresnoRef } from '../../../types/presenter/presno-ref';
import type { PresnoArgs } from '../../../types/presenter/presno-args';
import type { SynPresnoArgs } from '../../../types/presenter/syn-presno-args';
import type { NonSynPresnoArgs } from '../../../types/presenter/non-syn-presno-args';
import type { Syno } from '../../../types/syntactic/syno';

const synPresnoArgs = (synoRef: SynoRef): SynPresnoArgs => {
  return {
    type: 'synPresno',
    synoId: synoRef.id,
  };
};

const nonSynPresnoArgs = (
  args: NonSynPresnoArgs['presnoArgs'],
  parent: Syno,
): NonSynPresnoArgs => {
  return {
    type: 'nonSynPresno',
    parentId: parent.id,
    presnoArgs: args,
  };
};

const presnoRef = (presnoArgs: PresnoArgs) => {
  if (
    ['synPresno', 'nonSynPresno'].includes(presnoArgs.type)
  ) {
    return {
      presnoRef: true,
      id: presnoId(presnoArgs),
    };
  }

  throw new Error('Bad presno args');
};

export default (stack: PresnoArgs[]): PresentAndReturnRef => {
  function presentAndReturnRef(/* syn presno */
    synoRef: (null | SynoRef), /* null when ref is missing */
  ): PresnoRef;
  function presentAndReturnRef(/* non syn presno */
    presnoArgs: NonSynPresnoArgs['presnoArgs'],
    parent: Syno,
  ): PresnoRef;
  function presentAndReturnRef(
    synoRefOrArgs: (SynoRef | NonSynPresnoArgs['presnoArgs']),
    parentOrUndefined?: Syno,
  ): PresnoRef {
    if (synoRefOrArgs === null) {
      return null;
    }

    const presnoArgs: PresnoArgs = (
      Object.prototype.hasOwnProperty.call(synoRefOrArgs, 'synoRef')
        ? synPresnoArgs(synoRefOrArgs as SynoRef)
        : nonSynPresnoArgs(synoRefOrArgs as NonSynPresnoArgs['presnoArgs'], parentOrUndefined)
    );
    stack.push(presnoArgs);
    return presnoRef(presnoArgs);
  }

  return presentAndReturnRef;
};
