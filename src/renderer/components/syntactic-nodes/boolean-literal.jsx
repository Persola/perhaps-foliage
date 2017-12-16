// @flow
import React from 'react';
import type { booleanLiteral } from '../../../types/syntactic-nodes/boolean-literal'

type Props = {
  syntacticGraph: booleanLiteral
}

export default (props: Props) => {
  const { syntacticGraph } = props;
  if (syntacticGraph.klass !== 'booleanLiteral') {
    throw new Error('non-boolean masquerading as boolean');
  }

  return (
    <div className="same-line leaf bubble-even argument boolean-literal">
      {String(syntacticGraph.value)}
    </div>
  );
};
