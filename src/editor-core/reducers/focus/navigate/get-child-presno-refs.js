// @flow
import childSynos from '../../../../syntree-utils/child-synos'

import salivaNamePresnoUnfocusable from '../../../../extension-staging-area/saliva/name-presno-focusable'
import pantheonNamePresnoUnfocusable from '../../../../extension-staging-area/pantheon/name-presno-focusable'

import type { ChildPresnoRef } from '../../../../types/child-presno-ref'
import type { SynoMap } from '../../../../types/syno-map'
import type { Syno } from '../../../../types/syno'
import type { GrammarName } from '../../../../types/editor-state/grammar-name'

const NAME_PRESNO_UNFOCUSABLES_BY_GRAMMAR = {
  'saliva': salivaNamePresnoUnfocusable,
  'pantheon': pantheonNamePresnoUnfocusable,
};

const addNamePresno = (childPresnoRefs: ChildPresnoRef[], syno: Syno) => {
  childPresnoRefs.unshift({ // the name first
    synoRef: false,
    parent: {
      synoRef: true,
      id: syno.id
    },
    index: 0 // once names are divided into parts, need to find all of them
  });
};

export default (syno: Syno, synoMap: SynoMap, grammarName: GrammarName): ChildPresnoRef[] => {
  const childPresnoRefs: ChildPresnoRef[] = childSynos(syno);

  if (NAME_PRESNO_UNFOCUSABLES_BY_GRAMMAR[grammarName][syno.syntype](syno, synoMap)) {
    addNamePresno(childPresnoRefs, syno);    
  }

  return childPresnoRefs;
};
