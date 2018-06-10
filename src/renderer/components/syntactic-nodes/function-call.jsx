// @flow
import React from 'react';
import SyntacticNode from './../syntactic-node.jsx'
import NamePart from './../vis/name-part.jsx'
import type { functionCall } from '../../../types/syntactic-nodes/function-call'

type Props = {
  syntacticGraph: functionCall
}

export default (props: Props) => {
  const {
    syntacticGraph,
    syntacticGraph: { functionRef }
  } = props;

  if (syntacticGraph.klass !== 'functionCall') {
    throw new Error('non-function call masquerading as function call');
  }

  const candidateNames = [functionRef.graphId].concat(functionRef.nodePath)
  const name = candidateNames[candidateNames.length - 1]

  return (
    <div className="same-line expression unresolved-function-call">
      <NamePart namePart={name} />
      <SyntacticNode syntacticGraph={syntacticGraph.argumentz[0]} />
    </div>
  );
};
