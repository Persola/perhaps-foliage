// @flow
import childSynos from '../../../../syntree-utils/child-synos'

import salivaNamePresnoUnfocusable from '../../../../extension-staging-area/saliva/name-presno-focusable'
import pantheonNamePresnoUnfocusable from '../../../../extension-staging-area/pantheon/name-presno-focusable'

import type { ChildPresnoRef } from '../../../../types/child-presno-ref'
import type { SynoMap } from '../../../../types/syno-map'
import type { Syno } from '../../../../types/syno'
import type { SynoRef } from '../../../../types/syno-ref'
import type { GrammarName } from '../../../../types/editor-state/grammar-name'
import type { NamePresnoFocusable } from '../../../../extension-staging-area/saliva/types/name-presno-focusable'

const NAME_PRESNO_UNFOCUSABLES_BY_GRAMMAR = {
  'saliva': salivaNamePresnoUnfocusable,
  'pantheon': pantheonNamePresnoUnfocusable,
};

const genNamePresnos = (syno: Syno): $ReadOnlyArray<ChildPresnoRef> => {
  return [{
    synoRef: false,
    parent: {
      synoRef: true,
      id: syno.id,
      relation: 'parent'
    },
    index: 0 // once names are divided into parts, need to find all of them
  }];
};

export default (syno: Syno, synoMap: SynoMap, grammarName: GrammarName): $ReadOnlyArray<ChildPresnoRef> => {
  const focusableMap: NamePresnoFocusable = NAME_PRESNO_UNFOCUSABLES_BY_GRAMMAR[grammarName];
  let namePresnos: $ReadOnlyArray<ChildPresnoRef>;
  if (focusableMap[syno.syntype](syno, synoMap)) {
    namePresnos = genNamePresnos(syno);    
  } else {
    namePresnos = [];
  }

  const childSynoRefs: $ReadOnlyArray<ChildPresnoRef> = (childSynos(syno): SynoRef[]);

  return [
    ...namePresnos, // put all name parts first (for now)
    ...childSynoRefs
  ];
};
