import * as React from 'react';

import SyntacticNode from './syntactic-node';
import OutdatedMessage from './outdated-message';
import createPresnoFetcher from '../../../prestree-utils/create-presno-fetcher';

import type { CrossContextMessageSender } from '../../../types/cross-context/cross-context-messaging';
import type { Prestree } from '../../../types/presenter/prestree';
import type { RendersideLanguageIntegration } from '../../../types/language-integration/renderside-language-integration';
import type { RendersidePresentLanguageIntegration } from '../../../types/language-integration/renderside-present-language-integration';

type Props = {
  sendCrossContextMessage: CrossContextMessageSender;
  integration: RendersideLanguageIntegration;
  codePresentation: Prestree | null;
  outdated: boolean;
  interpreting: boolean;
  dragDrop: boolean;
};
const outdatedMessage = <OutdatedMessage />;

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

const dropCodeView = (sendCrossContextMessage, e) => {
  e.stopPropagation();
  e.preventDefault();
  e.target.classList.remove('hovering-file');
  e.dataTransfer.files[0].text().then(fileText => {
    sendCrossContextMessage(
      'dispatchAction',
      {
        action: {
          type: 'START_SYNTREE_LOAD',
          fileText,
        },
      },
    );
  });
};

export default (props: Props): JSX.Element => {
  const {
    sendCrossContextMessage,
    integration,
    codePresentation,
    outdated,
    interpreting,
    dragDrop,
  } = props;

  const boundDropCodeView = e => {
    dropCodeView(sendCrossContextMessage, e);
  };

  let content;

  if (!codePresentation) {
    content = <div className="non-syntactic">(nothing to display)</div>;
  } else {
    const presentIntegration = integration as RendersidePresentLanguageIntegration;
    const { presnos, rootId } = codePresentation;
    const getPresno = createPresnoFetcher(presnos);
    content = (
      <SyntacticNode
        integration={presentIntegration}
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
      {outdated ? outdatedMessage : null}
      {content}
    </div>
  );
};
