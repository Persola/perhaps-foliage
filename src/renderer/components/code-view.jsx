// @flow
import * as React from 'react';
import SyntacticNode from './syntactic-node.jsx';
import OutdatedMessage from './outdated-message.jsx';
import createPresnoFetcher from '../../prestree-utils/create-presno-fetcher';

import type { GrammarName } from '../../types/editor-state/grammar-name';
import type { Prestree } from '../../types/presenter/prestree';

type Props = {
  grammarName: GrammarName,
  codePresentation: Prestree | false,
  outdated: boolean,
  interpreting: boolean
}

const outdatedMessage = (
  <OutdatedMessage />
);

export default (props: Props): React.Node => {
  const {
    grammarName, codePresentation, outdated, interpreting,
  } = props;

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
      <SyntacticNode
        grammarName={grammarName}
        getPresno={getPresno}
        synoId={rootId}
        SynoRenderer={SyntacticNode}
      />
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
