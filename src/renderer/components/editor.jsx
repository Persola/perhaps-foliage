// @flow
import React from 'react';

import CodeStage from './code-stage.jsx';
import InterpretButton from './interpret-button.jsx';
import interpreter from '../../interpreter/interpreter.js'
import editorStateStore from '../../editor-state-store.js'

type Props = {
  presentation: Object
}

type syntacticGraph = Object
type state = Object

const interpretStage = (syntacticGraph: syntacticGraph) => {
  editorStateStore.dispatch({
    type: 'UPDATE_RESULT',
    result: interpreter(syntacticGraph)
  });
};

export default (props: Props) => {
  const { presentation: { stageful, result } } = props;

  const interpret = () => {
    interpretStage(stageful);
  };

  return (
    <div className="editor">
      <CodeStage key="code" stageful={stageful} />
      <InterpretButton interpret={interpret} />
      <CodeStage key="result" stageful={result || false} />
    </div>
  );
};
