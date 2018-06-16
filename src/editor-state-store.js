// @flow
import { createStore } from 'redux';
import codeLoader from './code-loader/code-loader.js'
import dupGraphs from './dup-graphs.js'
import type { reduxAction } from './types/redux-action.js'
import type { editorState } from './types/editor-state.js'
import type { syntacticGraphMap } from './types/syntactic-graph-map'

const defaultEditorState = {
  graphs: codeLoader('norCall'),
  // graphs: codeLoader('synoMap'),
  stagedNodeId: '1-1',
  resultNodeId: false,
  resultOutdated: false
};
const naturalReduxStates = ['@@redux/INIT']
const editorstateReducer = (
  originalState: editorState = defaultEditorState,
  action: reduxAction
): editorState => {
  if (action.type === 'INITIALIZE') {
    return originalState;
  } else if (action.type === 'REPLACE_FOCUSED_NODE') {
    const { newSynoAttrs } = action;
    const newSynoId = `inputValue-${String(Math.random()).substring(2)}`;
    const newSynoMap: syntacticGraphMap = dupGraphs(originalState.graphs);
    const newSyno = Object.assign({}, newSynoAttrs, { id: newSynoId });

    const parentRef = originalState.graphs[originalState.stagedNodeId].parent;
    if (parentRef) {
      const parent = originalState.graphs[parentRef.id];

      if (parent.argumentz && Object.keys(parent.argumentz).length > 0) {
        const focusedNodeArgumentKey = Object.keys(parent.argumentz).find(argKey => {
          return (parent.argumentz[argKey].id === originalState.stagedNodeId);
        });
        // need to remove any uneeded (i.e., deleted) nodes from store
        const newParent = newSynoMap[parent.id];
        newParent.argumentz[focusedNodeArgumentKey] = {
          synoRef: true,
          id: newSynoId
        }
      }

      newSyno.parent = {
        synoRef: true,
        id: parentRef.id
      }
    } else {
      newSyno.parent = false;
    }

    newSynoMap[newSynoId] = newSyno;

    return Object.assign({}, originalState, {
      stagedNodeId: newSynoId,
      graphs: newSynoMap,
      resultOutdated: true
    });
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
      resultNodeId: rootId,
      resultOutdated: false
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
        } else {
          throw new Error('navigate failed; no argumentz!');
        }
        break;
      case 'prev':
        parent = originalState.graphs[parentRef.id];
        if (!parent) { throw new Error('navigate failed; no parent!'); }
        if (parent.argumentz && Object.keys(parent.argumentz).length > 0) {
          newStagedNodeId = Object.values(parent.argumentz)[0].id
        } else {
          throw new Error('navigate failed; no argumentz!');
        }
        break;
      case 'next':
        parent = originalState.graphs[parentRef.id];
        if (!parent) { throw new Error('navigate failed; no parent!'); }
        if (parent.argumentz && Object.keys(parent.argumentz).length > 0) {
          newStagedNodeId = Object.values(parent.argumentz)[1].id
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
