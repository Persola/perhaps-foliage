// @flow
import React from 'react';
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

export default (props: Props) => {
  const { grammar, synoId, getPresno } = props;
  const presno: Presno = getPresno(synoId);

  switch (presno.syntype) {
    case 'booleanLiteral': {
      return(
        <BooleanLiteral grammar={grammar} getPresno={getPresno} presno={presno} />
      )
    }
    case 'functionCall': {
      return(
        <FunctionCall grammar={grammar} getPresno={getPresno} presno={presno} />
      )
    }
    case 'functionDefinition': {
      return(
        <FunctionDefinition grammar={grammar} getPresno={getPresno} presno={presno} />
      )
    }
    case 'functionParameter': {
      return(
        <FunctionParameter grammar={grammar} getPresno={getPresno} presno={presno} />
      )
    }
    case 'argument': {
      return(
        <Argument grammar={grammar} getPresno={getPresno} presno={presno} />
      )
    }
    case 'variableRef': {
      return(
        <VariableRef grammar={grammar} getPresno={getPresno} presno={presno} />
      )
    }
    default: {
      throw new Error(`unrecognized type: '${presno.syntype}'`);
    }
  }
};
