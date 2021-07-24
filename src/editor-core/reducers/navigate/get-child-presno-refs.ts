import childSynos from '../../../syntree-utils/child-synos';
import type { ChildPresnoRef } from '../../../types/child-presno-ref';
import type { Syno } from '../../../types/syno';
import type { StateSelector } from '../../../types/state-selector';
import type { SynoRef } from '../../../types/syno-ref';

const genNamePresnos = (syno: Syno): ReadonlyArray<ChildPresnoRef> => [
  {
    synoRef: false,
    parent: {
      synoRef: true,
      id: syno.id,
      relation: 'parent',
    },
    index: 0, // once names are divided into parts, need to find all of them
  },
];

export default (
  syno: Syno,
  state: StateSelector,
): ReadonlyArray<ChildPresnoRef> => {
  const { textHostRef } = state.grammar()[syno.syntype];
  let nameFocusable;

  if (!textHostRef) {
    // @ts-ignore: This isn't guaranteed because we don't validate nameHostRef vs. name in grammar
    nameFocusable = syno.name && !state.isPrimitive(syno.id);
  } else if (!syno[textHostRef]) {
    nameFocusable = false;
  } else {
    nameFocusable = !state.isPrimitive(syno[textHostRef].id);
  }

  let namePresnos;

  if (nameFocusable) {
    namePresnos = genNamePresnos(syno);
  } else {
    namePresnos = [];
  }

  const childSynoRefs: ReadonlyArray<ChildPresnoRef> = childSynos(
    syno,
  ) as SynoRef[];
  return [
    ...namePresnos, // put all name parts first (for now)
    ...childSynoRefs,
  ];
};
