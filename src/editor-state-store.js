// @flow
import { createStore } from 'redux';
import codeLoader from './code-loader/code-loader.js'
import dupGraphs from './dup-graphs.js'
import retrieveNodeFromGraphCollection from './retrieve-node-from-graph-collection.js'
import type { reduxAction } from './types/redux-action.js'
import type { editorState } from './types/editor-state.js'
import type { syntacticGraph } from './types/syntactic-graph.js'
import type { syntacticGraphMap } from './types/syntactic-graph-map'

// const defaultStageful: syntacticGraph = codeLoader();
const defaultStageful: syntacticGraph = codeLoader('proxyNorCall');
const defaultEditorState = {
  graphs: {'1': defaultStageful, '2': codeLoader()},
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
  } else if (action.type === 'REPLACE_STAGE') {
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
  } else if (action.type === 'NAVIGATE') {
    const { direction } = action;
    const { focusedNodePath: oldPath } = originalState;
    let newPath = [];

    switch (direction) {
      case 'out':
        oldPath.forEach((propName, ind) => {
          // how to determine which levels are nodes (-> node map?)
          if (ind < (oldPath.length - 2)) {
            newPath.push(propName);
          }
        });
        break;
      case 'in':
        const oldFocusNode = retrieveNodeFromGraphCollection(
          originalState.graphs,
          {
            graphId: originalState.stagedGraphKey,
            nodePath: originalState.focusedNodePath
          }
        );

        if (oldFocusNode.argumentz && Object.keys(oldFocusNode.argumentz).length > 0) {
          oldPath.forEach((propName, ind) => {
            if (ind === (oldPath.length - 1)) {
              newPath.push(propName);
            }
          });

          newPath.push('argumentz');
          newPath.push(Object.keys(oldFocusNode.argumentz)[0]);
        } else {
          newPath = oldPath;
        }
        break;
      case 'prev':
        newPath = oldPath;
        break;
      case 'next':
        newPath = oldPath;
        break;
    }

    return Object.assign({}, originalState, {
      focusedNodePath: newPath
    });
  } else if (naturalReduxStates.includes(action.type)) {
    return originalState;
  } else {
    console.warn(`Unrecognized action type: '${action.type}'`); // eslint-disable-line no-console
    return originalState;
  }
}

export default createStore(editorstateReducer);
