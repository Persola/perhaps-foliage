// @noflow
import createSynoFetcher from '../create-syno-fetcher.js'
import ascendToRoot from '../ascend-to-root.js'

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
    this.renderer.render(presentation, editorState.resultOutdated);
  }

  generatePresentation(editorState: editorState): presentation {
    const { graphs, stagedNodeId, resultNodeId } = editorState
    const getSyno = createSynoFetcher(graphs);
    const stagedSyno = stagedNodeId ? graphs[stagedNodeId] : false;
    const resultSyno = resultNodeId ? graphs[resultNodeId] : false;

    if (!stagedSyno) {
      throw new Error('focus node not found in editor state')
    }

    return {
      stage: this.presentFocusedNode(stagedSyno, {}, getSyno, stagedNodeId),
      result: this.presentNode(resultSyno, {}, getSyno, false)
    };
  }

  presentFocusedNode(
    focusedSyno: syntacticGraph,
    scope: {},
    getSyno: Function,
    focusNodeId: (string | false)
  ): presentationGraph {
    const renderingRoot = ascendToRoot(focusedSyno, getSyno);
    return this.presentNode(renderingRoot, scope, getSyno, focusNodeId);
  }

  presentNode(
    node: syntacticGraph,
    scope: {},
    getSyno: Function,
    focusNodeId: (string | false)
  ): presentationGraph {
    if (node === false) {
      return false;
    } else if (node.klass === 'functionCall') {
      return this.presentFunctionCall(node, scope, getSyno, focusNodeId);
    } else if (node.klass === 'booleanLiteral') {
      return this.presentBooleanLiteral(node, focusNodeId);
    } else {
      throw new Error('should be unreachable (new type?)')
    }
  }

  presentBooleanLiteral( // should be reducer?
    leBooleanLiteral: booleanLiteral,
    focusNodeId: (string | false)
  ): booleanLiteralPres {
    const { value } = leBooleanLiteral
    let focused = (leBooleanLiteral.id === focusNodeId)
    return {
      klass: 'booleanLiteral',
      value,
      focused
    }
  }

  presentFunctionCall( // should be reducer?
    funkshunCall: functionCall,
    scope: {},
    getSyno: Function,
    focusNodeId: (string | false)
  ): functionCallPres {
    let resolved: boolean;
    let internalScope;
    let focused = (funkshunCall.id === focusNodeId)
    const callee = getSyno(funkshunCall.callee);
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
      argumentz: Object.values(funkshunCall.argumentz).map((arg: syntacticGraph): presentationGraph => {
        return this.presentNode(getSyno(arg), internalScope, getSyno, focusNodeId);
      }),
      resolved,
      focused
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
