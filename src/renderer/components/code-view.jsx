// @flow
import * as React from 'react';
import SyntacticNode from './syntactic-node.jsx';
import OutdatedMessage from './outdated-message.jsx';
import createPresnoFetcher from '../../prestree-utils/create-presno-fetcher';
import editorStateStore from '../../editor-core/editor-state-store';

import type { GrammarName } from '../../types/editor-state/grammar-name';
import type { Prestree } from '../../types/presenter/prestree';

type Props = {
  grammarName: GrammarName,
  codePresentation: Prestree | false,
  outdated: boolean,
  interpreting: boolean,
  dragDrop: boolean,
}

const outdatedMessage = (
  <OutdatedMessage />
);

const dragEnterCodeView = e => {
  e.stopPropagation();
  e.preventDefault();
  e.target.classList.add('hovering-file');
};

const dragLeaveCodeView = e => {
  e.stopPropagation();
  e.preventDefault();
  e.target.classList.remove('hovering-file');
};

const dragOverCodeView = e => {
  e.stopPropagation();
  e.preventDefault();
};

const dropCodeView = e => {
  e.stopPropagation();
  e.preventDefault();
  e.target.classList.remove('hovering-file');
  editorStateStore.dispatch({
    type: 'START_SYNTREE_LOAD',
    file: e.dataTransfer.files[0],
  });
};

export default (props: Props): React.Node => {
  const {
    grammarName,
    codePresentation,
    outdated,
    interpreting,
    dragDrop,
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
    <div
      className={classes}
      onDragEnter={dragDrop ? dragEnterCodeView : null}
      onDragLeave={dragDrop ? dragLeaveCodeView : null}
      onDragOver={dragDrop ? dragOverCodeView : null}
      onDrop={dragDrop ? dropCodeView : null}
    >
      { outdated ? outdatedMessage : null }
      {content}
    </div>
  );
};
