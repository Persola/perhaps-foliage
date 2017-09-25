// @flow
import React from 'react';
import BooleanLiteral from './syntactic-nodes/boolean-literal.jsx'
import FunctionCall from './syntactic-nodes/function-call.jsx'
import type { syntacticGraph } from '../../types/syntactic-graph'

type Props = {
  syntacticGraph: syntacticGraph
}

export default (props: Props) => {
  const { syntacticGraph } = props;

  let rendering;
  switch (syntacticGraph.klass) {
    case 'booleanLiteral':
      rendering = (
        <BooleanLiteral syntacticGraph={syntacticGraph} />
      )
      break;
    case 'functionCall':
      rendering = (
        <FunctionCall syntacticGraph={syntacticGraph} />
      )
      break;
    default:
      throw new Error('no types yet');
  }

  return (rendering);
};
