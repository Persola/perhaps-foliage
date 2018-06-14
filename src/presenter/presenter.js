// @noflow
import descendToNode from '../descend-to-node.js'
import type { editorState } from '../types/editor-state.js' // eslint-disable-line no-unused-vars

import type { syntacticGraph } from '../types/syntactic-graph.js' // eslint-disable-line no-unused-vars
import type { booleanLiteral } from '../types/syntactic-nodes/boolean-literal.js' // eslint-disable-line no-unused-vars
import type { functionCall } from '../types/syntactic-nodes/function-call.js' // eslint-disable-line no-unused-vars
// import type { functionParameter } from '../types/syntactic-nodes/function-definition/function-parameter'

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
      stage: this.presentNode(focusedNode, {}, true),
      result: this.presentNode(result, {})
    };
  }

  presentNode(
    focusedSyntacticGraph: syntacticGraph,
    scope: {},
    focusNode = false
  ): presentationGraph {
    if (focusedSyntacticGraph.klass === 'functionCall') {
      return this.presentFunctionCall(focusedSyntacticGraph, scope, focusNode);
    } else if (focusedSyntacticGraph.klass === 'booleanLiteral') {
      return this.presentBooleanLiteral(focusedSyntacticGraph, focusNode);
    } else {
      throw new Error('should be unreachable (new type?)')
    }
  }

  presentBooleanLiteral( // should be reducer?
    focusedBooleanLiteral: booleanLiteral,
    focusNode: boolean
  ): booleanLiteralPres {
    const { value } = focusedBooleanLiteral
    return {
      klass: 'booleanLiteral',
      value,
      focusNode
    }
  }

  presentFunctionCall( // should be reducer?
    focusedfunctionCall: functionCall,
    scope: {},
    focusNode: boolean
  ): functionCallPres {
    let resolved: boolean;
    let internalScope;
    if (focusedfunctionCall.callee.klass === 'functionDefinition') {
      resolved = true;
      internalScope = this.parametersToScope(focusedfunctionCall.callee.parameterz);
    } else if (focusedfunctionCall.callee.klass === 'variableRef') {
      resolved = Object.keys(scope).includes(focusedfunctionCall.callee.name);
      // need to access parent to get scope (to get parameters from functionDefinition)
      // instead, mark them as unresolved
      internalScope = {};
    }

    return {
      klass: 'functionCall',
      name: focusedfunctionCall.callee.name,
      argumentz: Object.values(focusedfunctionCall.argumentz).map((arg: syntacticGraph): presentationGraph => {
        return this.presentNode(arg, internalScope);
      }),
      resolved,
      focusNode
    }
  }

  parametersToScope(parameters: {}) {
    // const scope = {};
    //
    // parameters.forEach((param: functionParameter) => {
    //   scope[param.name] = param.klass;
    // });
    //
    // return scope;

    return parameters;
  }
}
