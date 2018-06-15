// @flow
import React from 'react';
import SyntacticNode from './syntactic-node.jsx';
import type { presentationGraph } from '../../types/presentations/presentation-graph'

type Props = {
  codePresentation: presentationGraph | false
}

export default (props: Props) => {
  const { codePresentation } = props;

  let content;
  if (codePresentation === false) {
    content = (
      <div className="non-syntactic">
        (Nothing to display)
      </div>
    );
  } else {
    content = (
      <SyntacticNode codePresentation={codePresentation} />
    );
  }

  return (
    <div className="code-view">
      {content}
    </div>
  );
};
