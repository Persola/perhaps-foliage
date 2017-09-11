// @flow
import React from 'react';
import { connect } from 'react-redux';

import CodeStage from './code-stage.jsx';
import InterpretButton from './interpret-button.jsx';
import interpreter from '../../interpreter/interpreter.js'
import editorStateStore from '../../editor-state-store.js'

type Props = {
  stageful: Object,
  result: Object
}
type syntacticGraph = Object
type state = Object

const interpretStage = (syntacticGraph: syntacticGraph) => {
  editorStateStore.dispatch({
    type: 'UPDATE_RESULT',
    result: interpreter(syntacticGraph)
  });
};

export const Editor = (props: Props) => {
  const { stageful } = props;

  const interpret = () => {
    interpretStage(stageful);
  };

  return (
    <div>
      <CodeStage stageful={props.stageful} />
      <InterpretButton interpret={interpret} />
      <CodeStage stageful={props.result || false} />
    </div>
  );
};

export const mapStateToProps = (state: state): Object => {
  const { stageful, result } = state;
  return { stageful, result };
}

export const mapDispatchToProps = () => ({});

const EditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editor);

export default EditorContainer;
