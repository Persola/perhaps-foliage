import presnoId from './presno-id';
import isRef from '../../../syntree-utils/read-ref/is-ref';

import type { EnstackForPresentation } from '../../../types/presenter/enstack-for-presentation';
import type { SynoRef } from '../../../types/syntactic/syno-ref';
import type { PresnoRef } from '../../../types/presenter/presno-ref';
import type { PresnoArgs } from '../../../types/presenter/presno-args';
import type { SynPresnoArgs } from '../../../types/presenter/presno-args/syn-presno-args';
import type { NonSynPresnoArgs } from '../../../types/presenter/presno-args/non-syn-presno-args';
import type { Syno } from '../../../types/syntactic/syno';

const synPresnoArgs = (synoRef: SynoRef): SynPresnoArgs => {
  return {
    type: 'synPresno',
    synoId: synoRef.id,
  };
};

const nonSynPresnoArgs = (
  args: NonSynPresnoArgs['nonSynoArgs'],
  parent: Syno,
): NonSynPresnoArgs => {
  return {
    type: 'nonSynPresno',
    parentId: parent.id,
    nonSynoArgs: args,
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

export default (
  stack: PresnoArgs[],
  stub?: true,
): EnstackForPresentation => {
  function enstackForPresentation(// syn presno
    synoRef: (null | SynoRef), // null when syno has null in a key for synoRefs
  ): PresnoRef;
  function enstackForPresentation(// non syn presno
    presnoArgs: NonSynPresnoArgs['nonSynoArgs'],
    parent: Syno,
  ): PresnoRef;
  function enstackForPresentation(
    synoRefOrArgs: (SynoRef | NonSynPresnoArgs['nonSynoArgs']),
    parentOrUndefined?: Syno,
  ): PresnoRef {
    if (synoRefOrArgs === null) {
      return null;
    }

    const presnoArgs: PresnoArgs = (
      isRef(synoRefOrArgs)
        ? synPresnoArgs(synoRefOrArgs as SynoRef)
        : nonSynPresnoArgs(synoRefOrArgs as NonSynPresnoArgs['nonSynoArgs'], parentOrUndefined)
    );

    if (!stub) {
      stack.push(presnoArgs);
    }

    return presnoRef(presnoArgs);
  }

  return enstackForPresentation;
};
