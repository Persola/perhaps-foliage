// @flow
import descendToNode from '../descend-to-node.js'
import type { editorState } from '../types/editor-state.js' // eslint-disable-line no-unused-vars

import type { syntacticGraph } from '../types/syntactic-graph.js' // eslint-disable-line no-unused-vars
import type { booleanLiteral } from '../types/syntactic-nodes/boolean-literal.js' // eslint-disable-line no-unused-vars
import type { functionCall } from '../types/syntactic-nodes/function-call.js' // eslint-disable-line no-unused-vars

import type { presentation } from '../types/presentations/presentation.js' // eslint-disable-line no-unused-vars
import type { presentationGraph } from '../types/presentations/presentation-graph.js' // eslint-disable-line no-unused-vars
import type { booleanLiteralPres } from '../types/presentations/boolean-literal.js' // eslint-disable-line no-unused-vars
import type { functionCallPres } from '../types/presentations/function-call.js' // eslint-disable-line no-unused-vars

import type { reduxStore } from '../types/redux-store.js' // eslint-disable-line no-unused-vars
import type { aRenderer } from '../types/renderer.js' // eslint-disable-line no-unused-vars

export default class Presenter {
  editorStateStore: reduxStore;
  renderer: aRenderer;

  constructor(
    editorStateStore: reduxStore,
    renderer: Object
  ) {
    this.editorStateStore = editorStateStore;
    this.renderer = renderer;

    editorStateStore.subscribe(
      this.present.bind(this)
    );
  }

  present() {
    const editorState: editorState = this.editorStateStore.getState();
    const presentation = this.generatePresentation(editorState);
    this.renderer.render(presentation);
  }

  generatePresentation(editorState: editorState): presentation {
    const graphCollection = editorState.graphs;
    const stagedGraph = graphCollection[editorState.stagedGraphKey];
    const result = graphCollection[editorState.resultGraphKey];
    const focusedNode = descendToNode(stagedGraph, editorState.focusedNodePath);

    if (focusedNode === false) {
      throw new Error('focus node not found in editor state')
    }

    return {
      stage: this.presentNode(focusedNode),
      result: this.presentNode(result)
    };
  }

  presentNode(focusedSyntacticGraph: syntacticGraph): presentationGraph {
    if (focusedSyntacticGraph.klass === 'functionCall') {
      return this.presentFunctionCall(focusedSyntacticGraph);
    } else if (focusedSyntacticGraph.klass === 'booleanLiteral') {
      return this.presentBooleanLiteral(focusedSyntacticGraph);
    } else {
      throw new Error('should be unreachable (new type?)')
    }
  }

  presentBooleanLiteral(focusedBooleanLiteral: booleanLiteral): booleanLiteralPres { // should be reducer?
    const { value } = focusedBooleanLiteral
    return {
      klass: 'booleanLiteral',
      value
    }
  }

  presentFunctionCall(focusedSyntacticGraph: functionCall): functionCallPres { // should be reducer?
    const name: string = 'function name'

    return {
      klass: 'functionCall',
      name,
      argumentz: focusedSyntacticGraph.argumentz.map((arg: syntacticGraph): presentationGraph => {
        return this.presentNode(arg);
      })
    }
  }

  // get nodeAttrs() {
  //
  // }
}
