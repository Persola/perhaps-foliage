// @flow
import { createStore } from 'redux';
import codeLoader from './code-loader/code-loader.js'
import dupGraphs from './dup-graphs.js'
import type { reduxAction } from './types/redux-action.js'
import type { editorState } from './types/editor-state.js'
import type { syntacticGraph } from './types/syntactic-graph.js'
import type { functionDefinition } from './types/syntactic-nodes/function-definition.js'
import type { syntacticGraphMap } from './types/syntactic-graph-map'

// const defaultStageful: syntacticGraph = codeLoader();
const defaultStageful: syntacticGraph = {
  klass: 'functionCall',
  nor: false,
  functionRef: {
    graphId: '3',
    nodePath: []
  },
  argumentz: []
};
const andGraph: functionDefinition = {
  klass: 'functionDefinition',
  name: 'AND',
  parameterz: [
    {
      klass: 'booleanLiteral',
      name: 'first AND para'
    },
    {
      klass: 'booleanLiteral',
      name: 'second AND para'
    }
  ],
  body: {
    klass: 'functionCall',
    nor: true,
    argumentz: [
      {
        klass: 'booleanLiteral',
        value: true
      },
      {
        klass: 'booleanLiteral',
        value: true
      }
    ]
  }
};
const defaultEditorState = {
  graphs: {'1': defaultStageful, '2': codeLoader(), '3': andGraph},
  stagedGraphKey: '1',
  resultGraphKey: '2',
  focusedNodePath: []
};
const naturalReduxStates = ['@@redux/INIT']
const editorstateReducer = (
  originalState: editorState = defaultEditorState,
  action: reduxAction
): editorState => {
  if (action.type === 'INITIALIZE') {
    return originalState;
  } else if (action.type === 'UPDATE_STAGE') {
    const { stageful } = action;
    const newGraphList: syntacticGraphMap = dupGraphs(originalState.graphs);
    newGraphList[originalState.stagedGraphKey] = stageful;

    return Object.assign({}, originalState, {
      graphs: newGraphList
    });
  } else if (action.type === 'UPDATE_RESULT') {
    const { result } = action;
    const newGraphList: syntacticGraphMap = dupGraphs(originalState.graphs);
    newGraphList[originalState.resultGraphKey] = result;

    return Object.assign({}, originalState, {
      graphs: newGraphList
    });
  } else if (naturalReduxStates.includes(action.type)) {
    return originalState;
  } else {
    console.warn(`Unrecognized action type: '${action.type}'`); // eslint-disable-line no-console
    return originalState;
  }
}

export default createStore(editorstateReducer);
