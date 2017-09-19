// @flow
import React from 'react';
import type { syntacticGraph } from '../../types/syntactic-graph'

type Props = {
  serialization: syntacticGraph
}

export default (props: Props) => {
  const { serialization } = props;
  if (serialization.klass !== 'numberLiteral') { throw new Error('no types yet'); }

  const contextualType = 'expression';
  const contentualType = 'number-literal';

  return (
    <div className={`leaf ${contextualType} ${contentualType}`}>
      {serialization.data}
    </div>
  );
};
