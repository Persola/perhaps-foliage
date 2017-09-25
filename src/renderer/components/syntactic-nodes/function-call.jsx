// @flow
import React from 'react';
import SyntacticNode from './../syntactic-node.jsx'
import NamePart from './../vis/name-part.jsx'
import type { functionCall } from '../../../types/syntactic-nodes/function-call'

type Props = {
  syntacticGraph: functionCall
}

export default (props: Props) => {
  const { syntacticGraph } = props;
  if (syntacticGraph.klass !== 'functionCall') {
    throw new Error('non-function call masquerading as function call');
  }

  return (
    <div className={'same-line expression unresolved-function-call'}>
      <NamePart namePart={String(syntacticGraph.functionRef)} />
      <SyntacticNode syntacticGraph={syntacticGraph.arguments[0]} />
    </div>
  );
};
