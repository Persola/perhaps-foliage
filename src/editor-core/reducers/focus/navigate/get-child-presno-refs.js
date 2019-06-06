// @flow
import type { ChildPresnoRef } from '../../../../types/child-presno-ref'
import type { SynoMap } from '../../../../types/syno-map'
import type { Syno } from '../../../../types/syno'

export default (parentSyno: Syno, synoMap: SynoMap): ChildPresnoRef[] => {
  switch (parentSyno.syntype) {
    case 'functionCall': {
      const childPresnoRefs: ChildPresnoRef[] = [...parentSyno.argumentz];
      const calleeSyno = synoMap[parentSyno.callee.id];
      if (calleeSyno.syntype === 'functionDefinition') {
        childPresnoRefs.push(parentSyno.callee);
      }
      return childPresnoRefs
    }
    case 'functionDefinition': {
      const childPresnoRefs: ChildPresnoRef[] = [
        { // the name first
          synoRef: false,
          parent: {
            synoRef: true,
            id: parentSyno.id
          },
          index: 0 // once names are divided into parts, need to find all of them
        },
        ...parentSyno.parameters,
        parentSyno.body
      ];
      return childPresnoRefs;
    }
    case 'argument': {
      return [parentSyno.value];
    }
    default: {
      return [];
    }
  }
};
