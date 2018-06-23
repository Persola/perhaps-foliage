// @flow
import React from 'react';
import SyntacticNode from './syntactic-node.jsx';
import OutdatedMessage from './outdated-message.jsx';
import createPresnoFetcher from '../../prestree-utils/create-presno-fetcher';

import type { Prestree } from '../../types/presentations/prestree'

type Props = {
  codePresentation: Prestree | false,
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
    const { presnos, rootId } = codePresentation;
    const getPresno = createPresnoFetcher(presnos);
    content = (
      <SyntacticNode getPresno={getPresno} presnoId={rootId} />
    );
  }

  return (
    <div className="code-view">
      { outdated ? outdatedMessage : null }
      {content}
    </div>
  );
};
