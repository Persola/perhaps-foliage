// @flow
import childSynos from '../../../../syntree-utils/child-synos'

import type { ChildPresnoRef } from '../../../../types/child-presno-ref'
import type { SynoMap } from '../../../../types/syno-map'
import type { Syno } from '../../../../types/syno'
import type { FunctionDefinition } from '../../../../types/syntactic-nodes/function-definition'
import type { FunctionCall } from '../../../../types/syntactic-nodes/function-call'

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

export default (syno: Syno, synoMap: SynoMap): ChildPresnoRef[] => {
  const childPresnoRefs: ChildPresnoRef[] = childSynos(syno);

  switch (syno.syntype) {
    case 'functionCall': {
      const callee: FunctionDefinition = synoMap[syno.callee.id];
      if (
        syno.callee !== false &&
        callee.id !== 'primitives-nor' &&
        callee.syntype !== 'functionDefinition' // not used yet
      ) {
        addNamePresno(childPresnoRefs, syno);
      }
      break;
    }
    case 'argument': {
      const functionCall: FunctionCall = synoMap[syno.parent.id];
      const callee: FunctionDefinition = synoMap[functionCall.callee.id];
      if (callee.id !== 'primitives-nor') {
        addNamePresno(childPresnoRefs, syno);
      }
      break;
    }
    case 'functionDefinition': {
      if (syno.id !== 'primitives-nor') {
        addNamePresno(childPresnoRefs, syno);
      }
      break;
    }
    case 'functionParameter': {
      const functionDefinition: FunctionDefinition = synoMap[syno.parent.id];
      if (functionDefinition.id !== 'primitives-nor') {
        addNamePresno(childPresnoRefs, syno);
      }
      break;
    }
  }

  return childPresnoRefs;
};
