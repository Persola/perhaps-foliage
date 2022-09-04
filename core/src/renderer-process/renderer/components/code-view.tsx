import * as React from 'react';

import PresnoRenderer from './presno';
import OutdatedMessage from './outdated-message';
import createPresnoFetcher from '../../../prestree-utils/create-presno-fetcher';

import type { CrossContextMessageSender } from '../../../types/cross-context/cross-context-messaging';
import type { Prestree } from '../../../types/presenter/prestree';
import type { RendersideLangInt } from '../../../types/language-integration/interfaces/renderside/renderside-lang-int';
import type { RendersidePresentLangInt } from '../../../types/language-integration/interfaces/renderside/renderside-present-lang-int';

type Props = {
  sendCrossContextMessage: CrossContextMessageSender;
  integration: RendersideLangInt;
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
  if (document.activeElement instanceof HTMLElement) {
    (document.activeElement as HTMLElement).blur();
  }
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
    const presentIntegration = integration as RendersidePresentLangInt;
    const { presnos, rootId } = codePresentation;
    const getPresno = createPresnoFetcher(presnos);
    content = (
      <PresnoRenderer
        integration={presentIntegration}
        getPresno={getPresno}
        presnoId={rootId}
        PresnoRenderer={PresnoRenderer}
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
