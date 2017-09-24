// @flow
import React from 'react';
import type { syntacticGraph } from '../../types/syntactic-graph'

type Props = {
  syntacticGraph: syntacticGraph
}

export default (props: Props) => {
  const { syntacticGraph } = props;
  if (syntacticGraph.klass !== 'booleanLiteral') { throw new Error('no types yet'); }

  return (
    <div className={'same-line leaf expression boolean-literal'}>
      {String(syntacticGraph.data)}
    </div>
  );
};
