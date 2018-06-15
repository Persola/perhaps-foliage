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
// const defaultStageful: syntacticGraph = codeLoader('proxyNorCall');
const defaultEditorState = {
  graphs: codeLoader('synoMap'),
  stagedNodeId: '1-1',
  resultNodeId: false
};
const naturalReduxStates = ['@@redux/INIT']
const editorstateReducer = (
  originalState: editorState = defaultEditorState,
  action: reduxAction
): editorState => {
  if (action.type === 'INITIALIZE') {
    return originalState;
  } else if (action.type === 'REPLACE_STAGE') {
    throw new Error('why replace entire stageful?');
    // const { stageful } = action;
    // const newSynoMap: syntacticGraphMap = dupGraphs(originalState.graphs);
    // newSynoMap[originalState.stagedGraphKey] = stageful;
    //
    // return Object.assign({}, originalState, {
    //   graphs: newSynoMap
    // });
  } else if (action.type === 'UPDATE_RESULT') {
    const { result } = action;
    if (result.klass !== 'booleanLiteral') {
      throw new Error('fuck, I cant update result unless its a single boolean literal, need to deconstruct');
    }

    const newSynoMap: syntacticGraphMap = dupGraphs(originalState.graphs);
    const rootId = `interpResult-${String(Math.random()).substring(2)}}`;
    newSynoMap[rootId] = result;

    return Object.assign({}, originalState, {
      graphs: newSynoMap,
      resultNodeId: rootId
    });
  } else if (action.type === 'NAVIGATE') {
    const { direction } = action;
    const oldFocusedNode = originalState.graphs[originalState.stagedNodeId];
    let newStagedNodeId;
    const { parent: parentRef } = oldFocusedNode;
    let parent;

    switch (direction) {
      case 'out':
        if (!parentRef) { throw new Error('navigate failed; no parent!'); }
        newStagedNodeId = parentRef.id;
        break;
      case 'in':
        if (oldFocusedNode.argumentz && Object.keys(oldFocusedNode.argumentz).length > 0) {
          newStagedNodeId = Object.values(oldFocusedNode.argumentz)[0].id
          break;
        } else {
          throw new Error('navigate failed; no argumentz!');
        }
        break;
      case 'prev':
        parent = originalState.graphs[parentRef.id];
        if (!parent) { throw new Error('navigate failed; no parent!'); }
        if (parent.argumentz && Object.keys(parent.argumentz).length > 0) {
          newStagedNodeId = Object.values(parent.argumentz)[0].id
          break;
        } else {
          throw new Error('navigate failed; no argumentz!');
        }
        break;
      case 'next':
        parent = originalState.graphs[parentRef.id];
        if (!parent) { throw new Error('navigate failed; no parent!'); }
        if (parent.argumentz && Object.keys(parent.argumentz).length > 0) {
          newStagedNodeId = Object.values(parent.argumentz)[1].id
          break;
        } else {
          throw new Error('navigate failed; no argumentz!');
        }
        break;
    }

    return Object.assign({}, originalState, {
      stagedNodeId: newStagedNodeId
    });
  } else if (naturalReduxStates.includes(action.type)) {
    return originalState;
  } else {
    console.warn(`Unrecognized action type: '${action.type}'`); // eslint-disable-line no-console
    return originalState;
  }
}

export default createStore(editorstateReducer);
