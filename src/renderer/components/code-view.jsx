// @flow
import * as React from 'react';
import SyntacticNode from './syntactic-node.jsx';
import OutdatedMessage from './outdated-message.jsx';
import createPresnoFetcher from '../../prestree-utils/create-presno-fetcher';

import type { ReduxStore } from '../../types/redux-store';
import type { Prestree } from '../../types/presenter/prestree';
import type { LanguageIntegration } from '../../types/language-integration';

type Props = {
  editorStateStore: ReduxStore,
  integration: LanguageIntegration,
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

const dropCodeView = (editorStateStore, e) => {
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
    editorStateStore,
    integration,
    codePresentation,
    outdated,
    interpreting,
    dragDrop,
  } = props;

  const boundDropCodeView = e => { dropCodeView(editorStateStore, e); };

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
        integration={integration}
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
      onDrop={dragDrop ? boundDropCodeView : null}
    >
      { outdated ? outdatedMessage : null }
      {content}
    </div>
  );
};
