// @flow
import React from 'react';
import BooleanLiteral from './syntactic-nodes/boolean-literal.jsx'
import FunctionCall from './syntactic-nodes/function-call.jsx'
import type { presentationGraph } from '../../types/presentations/presentation-graph'

type Props = {
  codePresentation: presentationGraph
}

export default (props: Props) => {
  const { codePresentation } = props;

  if (codePresentation === false) {
    return 'NO CODE YO';
  }

  switch (codePresentation.syntype) {
    case 'booleanLiteral':
      return(
        <BooleanLiteral codePresentation={codePresentation} />
      )
    case 'functionCall':
      return(
        <FunctionCall codePresentation={codePresentation} />
      )
    default:
      throw new Error('no types yet');
  }
};
