// @flow
import React from 'react';
import SyntacticNode from './syntactic-node.jsx';
import OutdatedMessage from './outdated-message.jsx';
import type { presentationGraph } from '../../types/presentations/presentation-graph'

type Props = {
  codePresentation: presentationGraph | false,
  outdated: boolean
}

const outdatedMessage = (
  <OutdatedMessage />
);

export default (props: Props) => {
  const { codePresentation, outdated } = props;

  let content;
  if (codePresentation === false) {
    content = (
      <div className="non-syntactic">
        (nothing to display)
      </div>
    );
  } else {
    content = (
      <SyntacticNode codePresentation={codePresentation} />
    );
  }

  return (
    <div className="code-view">
      { outdated ? outdatedMessage : null }
      {content}
    </div>
  );
};
