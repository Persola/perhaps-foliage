// @flow
import React from 'react';
import SyntacticNode from './syntactic-node.jsx';
import type { syntacticGraph } from '../../types/syntactic-graph'

type Props = {
  stageful: syntacticGraph | false
}

export default (props: Props) => {
  const { stageful } = props;

  let stageContents;
  if (stageful === false) {
    stageContents = (
      <div className="non-syntactic">
        (Code stage is empty)
      </div>
    );
  } else {
    stageContents = (
      <SyntacticNode serialization={stageful} />
    );
  }

  return (
    <div className="code-stage">
      {stageContents}
    </div>
  );
};
