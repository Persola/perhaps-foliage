// @flow
import React from 'react';
import SyntacticNode from './../syntactic-node.jsx'
import NamePart from './../vis/name-part.jsx'
import type { functionCall } from '../../../types/syntactic-nodes/function-call'

type Props = {
  syntacticGraph: functionCall
}

export default (props: Props) => {
  const { syntacticGraph: { klass, functionRef, argumentz } } = props;

  if (klass !== 'functionCall') {
    throw new Error('non-function call masquerading as function call');
  }

  let name
  if (functionRef === 'NOR') {
    name = 'NOR'
  } else {
    const candidateNames = [functionRef.graphId].concat(functionRef.nodePath)
    name = candidateNames[candidateNames.length - 1]
  }

  return (
    <div className="same-line expression unresolved-function-call">
      <NamePart namePart={name} />
      {
        argumentz.map((arg, ind) => {
          return <SyntacticNode key={`arg_${ind + 1}`} syntacticGraph={arg} />
        })
      }
    </div>
  );
};
