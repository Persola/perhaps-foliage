// @flow
import React from 'react';
import Titan from './syntactic-nodes/pantheon/titan.jsx'
import Olympian from './syntactic-nodes/pantheon/olympian.jsx'
import BooleanLiteral from './syntactic-nodes/boolean-literal.jsx'
import FunctionCall from './syntactic-nodes/function-call.jsx'
import FunctionDefinition from './syntactic-nodes/function-definition.jsx'
import FunctionParameter from './syntactic-nodes/function-parameter.jsx'
import Argument from './syntactic-nodes/argument.jsx'
import VariableRef from './syntactic-nodes/variable-ref.jsx'

import type { Grammar } from '../../types/editor-state/grammar'
import type { Presno } from '../../types/presentations/presno'
import type { SynoId } from '../../types/syno-id'

type Props = {
  grammar: Grammar,
  getPresno: (SynoId) => Presno,
  synoId: SynoId
}

const RENDERERS_BY_GRAMMAR = {
  saliva: {
    booleanLiteral: BooleanLiteral,
    functionCall: FunctionCall,
    functionDefinition: FunctionDefinition,
    functionParameter: FunctionParameter,
    argument: Argument,
    variableRef: VariableRef
  },
  pantheon: {
    titan: Titan,
    olympian: Olympian    
  }
}

export default (props: Props) => {
  const { grammar, synoId, getPresno } = props;
  const presno: Presno = getPresno(synoId);

  const grammarRenderer = RENDERERS_BY_GRAMMAR[grammar];
  if (!grammarRenderer) {
    throw new Error('unrecognized grammar');      
  }

  const Renderer = grammarRenderer[presno.syntype];
  if (Renderer) {
    return(
      <Renderer grammar={grammar} getPresno={getPresno} presno={presno} />
    )
  } else {
    throw new Error(`unrecognized type: '${presno.syntype}'`);      
  }
};
