// @flow
import childSynos from '../../../../syntree-utils/child-synos'

import type { ChildPresnoRef } from '../../../../types/child-presno-ref'
import type { SynoMap } from '../../../../types/syno-map'
import type { Syno } from '../../../../types/syno'

export default (parentSyno: Syno, synoMap: SynoMap): ChildPresnoRef[] => {
  const childPresnoRefs: ChildPresnoRef[] = childSynos(parentSyno);

  if ([
    'functionDefinition',
    'argument',
    'functionParameter'
  ].includes(parentSyno.syntype)) {
    childPresnoRefs.unshift({ // the name first
      synoRef: false,
      parent: {
        synoRef: true,
        id: parentSyno.id
      },
      index: 0 // once names are divided into parts, need to find all of them
    })
  }

  if (
    parentSyno.syntype === 'functionCall' &&
    parentSyno.id !== 'primitives-nor' &&
    parentSyno.callee !== false &&
    synoMap[parentSyno.callee.id].syntype !== 'functionDefinition'
  ) {
    childPresnoRefs.unshift({ // the name first
      synoRef: false,
      parent: {
        synoRef: true,
        id: parentSyno.id
      },
      index: 0 // once names are divided into parts, need to find all of them
    })
  }

  return childPresnoRefs;
};
