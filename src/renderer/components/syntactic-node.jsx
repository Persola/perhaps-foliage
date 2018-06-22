// @flow
import React from 'react';
import BooleanLiteral from './syntactic-nodes/boolean-literal.jsx'
import FunctionCall from './syntactic-nodes/function-call.jsx'
import FunctionDefinition from './syntactic-nodes/function-definition.jsx'
import FunctionParameter from './syntactic-nodes/function-parameter.jsx'
import type { PresentationGraph } from '../../types/presentations/presentation-graph'

type Props = {
  codePresentation: PresentationGraph
}

export default (props: Props) => {
  const { codePresentation } = props;

  if (codePresentation === false) {
    return 'NO CODE YO';
  }

  switch (codePresentation.syntype) {
    case 'booleanLiteral': {
      return(
        <BooleanLiteral codePresentation={codePresentation} />
      )
    }
    case 'functionCall': {
      return(
        <FunctionCall codePresentation={codePresentation} />
      )
    }
    case 'functionDefinition': {
      return(
        <FunctionDefinition codePresentation={codePresentation} />
      )
    }
    case 'functionParameter': {
      return(
        <FunctionParameter codePresentation={codePresentation} />
      )
    }
    default: {
      throw new Error('no types yet');
    }
  }
};
