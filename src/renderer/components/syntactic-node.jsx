// @flow
import React from 'react';
import type { syntacticGraph } from '../../types/syntactic-graph'

type Props = {
  serialization: syntacticGraph
}

export default (props: Props) => {
  const { serialization } = props;
  if (serialization.klass !== 'booleanLiteral') { throw new Error('no types yet'); }

  return (
    <div className={'same-line leaf expression boolean-literal'}>
      {String(serialization.data)}
    </div>
  );
};
