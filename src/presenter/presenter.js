// @noflow
import createSynoFetcher from '../create-syno-fetcher.js'

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
    const { graphs, stagedNodeId, resultNodeId } = editorState
    const getSyno = createSynoFetcher(graphs);
    const stagedSyno = stagedNodeId ? graphs[stagedNodeId] : false;
    const resultSyno = resultNodeId ? graphs[resultNodeId] : false;

    if (stagedSyno === undefined) {
      throw new Error('focus node not found in editor state')
    }

    return {
      stage: this.presentNode(stagedSyno, {}, getSyno, true),
      result: this.presentNode(resultSyno, {}, getSyno)
    };
  }

  presentNode(
    focusedSyntacticGraph: syntacticGraph,
    scope: {},
    getSyno: Function,
    focusNode = false
  ): presentationGraph {
    if (focusedSyntacticGraph === false) {
      return false;
    } else if (focusedSyntacticGraph.klass === 'functionCall') {
      return this.presentFunctionCall(focusedSyntacticGraph, scope, getSyno, focusNode);
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
    getSyno: Function,
    focusNode: boolean
  ): functionCallPres {
    let resolved: boolean;
    let internalScope;
    const callee = getSyno(focusedfunctionCall.callee);
    if (callee.klass === 'functionDefinition') {
      resolved = true;
      internalScope = this.parametersToScope(callee.parameterz);
    } else if (callee.klass === 'variableRef') {
      resolved = Object.keys(scope).includes(callee.name);
      // need to access parent to get scope (to get parameters from functionDefinition)
      // instead, mark them as unresolved
      internalScope = {};
    }

    return {
      klass: 'functionCall',
      name: callee.name,
      argumentz: Object.values(focusedfunctionCall.argumentz).map((arg: syntacticGraph): presentationGraph => {
        return this.presentNode(getSyno(arg), internalScope);
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
