// @flow
import forChildSynoOf from './for-child-syno-of'

import type { Syno } from '../types/syno.js'
import type { SynoRef } from '../types/syno-ref.js'

export default (parentSyno: Syno) => {
  const childPresnoRefs: SynoRef[] = [];

  forChildSynoOf(parentSyno, (childRef) => {
    childPresnoRefs.push(childRef);
  });

  return childPresnoRefs;
}
