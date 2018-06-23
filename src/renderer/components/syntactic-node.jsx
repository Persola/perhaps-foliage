// @flow
import React from 'react';
import BooleanLiteral from './syntactic-nodes/boolean-literal.jsx'
import FunctionCall from './syntactic-nodes/function-call.jsx'
import FunctionDefinition from './syntactic-nodes/function-definition.jsx'
import FunctionParameter from './syntactic-nodes/function-parameter.jsx'
import VariableRef from './syntactic-nodes/variable-ref.jsx'
import type { Presno } from '../../types/presentations/presno'
import type { SynoId } from '../../types/syno-id'

type Props = {
  getPresno: (SynoId) => Presno,
  presnoId: SynoId
}

export default (props: Props) => {
  const { presnoId, getPresno } = props;
  const presno: Presno = getPresno(presnoId);

  switch (presno.syntype) {
    case 'booleanLiteral': {
      return(
        <BooleanLiteral getPresno={getPresno} presno={presno} />
      )
    }
    case 'functionCall': {
      return(
        <FunctionCall getPresno={getPresno} presno={presno} />
      )
    }
    case 'functionDefinition': {
      return(
        <FunctionDefinition getPresno={getPresno} presno={presno} />
      )
    }
    case 'functionParameter': {
      return(
        <FunctionParameter getPresno={getPresno} presno={presno} />
      )
    }
    case 'variableRef': {
      return(
        <VariableRef getPresno={getPresno} presno={presno} />
      )
    }
    default: {
      throw new Error(`unrecognized type: ${presno.syntype}`);
    }
  }
};
