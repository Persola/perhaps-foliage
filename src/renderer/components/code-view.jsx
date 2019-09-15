// @flow
import React from 'react';
import SyntacticNode from './syntactic-node.jsx';
import OutdatedMessage from './outdated-message.jsx';
import createPresnoFetcher from '../../prestree-utils/create-presno-fetcher';

import type { Grammar } from '../../types/editor-state/grammar'
import type { Prestree } from '../../types/presentations/prestree'

type Props = {
  grammar: Grammar,
  codePresentation: Prestree | false,
  outdated: boolean,
  interpreting: boolean
}

const outdatedMessage = (
  <OutdatedMessage />
);

export default (props: Props) => {
  const { grammar, codePresentation, outdated, interpreting } = props;

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
      <SyntacticNode grammar={grammar} getPresno={getPresno} synoId={rootId} />
    );
  }

  const classes = `code-view ${interpreting ? 'interpreting' : ''}`;

  return (
    <div className={classes}>
      { outdated ? outdatedMessage : null }
      {content}
    </div>
  );
};
