// @flow
import React from 'react';
import SyntacticNode from './syntactic-node.jsx';

type Props = {
  stageful: Object
}

export default (props: Props) => {
  const { stageful } = props;

  if (stageful === false) {
    return (
      <div>
        (Code stage is empty)
      </div>
    );
  } else if (typeof stageful !== 'object') {
    throw new Error('stageful missing')
  }

  return (
    <SyntacticNode serialization={stageful} />
  );
};
