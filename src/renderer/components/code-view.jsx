// @flow
import React from 'react';
import SyntacticNode from './syntactic-node.jsx';
import type { syntacticGraph } from '../../types/syntactic-graph'

type Props = {
  code: syntacticGraph | false
}

export default (props: Props) => {
  const { code } = props;

  let content;
  if (code === false) {
    content = (
      <div className="non-syntactic">
        (Code stage is empty)
      </div>
    );
  } else {
    content = (
      <SyntacticNode syntacticGraph={code} />
    );
  }

  return (
    <div className="code-view">
      {content}
    </div>
  );
};
