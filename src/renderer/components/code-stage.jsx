// @flow
import React from 'react';
import SyntacticNode from './syntactic-node.jsx';

type Props = {
  stageful: Object
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
  } else if (typeof stageful !== 'object') {
    throw new Error('stageful missing')
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
