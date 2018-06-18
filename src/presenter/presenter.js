// @flow
import createSynoFetcher from '../create-syno-fetcher.js'
import ascendToRoot from '../ascend-to-root.js'

import type { editorState } from '../types/editor-state.js' // eslint-disable-line no-unused-vars

import type { syno } from '../types/syno.js' // eslint-disable-line no-unused-vars
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
    focusedSyno: syno,
    scope: {},
    getSyno: Function,
    focusNodeId: (string | false)
  ): presentationGraph {
    const renderingRoot = ascendToRoot(focusedSyno, getSyno);
    return this.presentNode(renderingRoot, scope, getSyno, focusNodeId);
  }

  presentNode(
    node: syno,
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
    let focused = (funkshunCall.id === focusNodeId)
    if (funkshunCall.nor) {
      return(this.presentNorCall(funkshunCall, scope, getSyno, focusNodeId));
    }

    const callee = getSyno(funkshunCall.callee);
     if (callee.klass === 'functionDefinition') {
      resolved = true;
    } else if (callee.klass === 'variableRef') {
      resolved = Object.keys(scope).includes(callee.name);
    } else { throw new Error('new type?'); }

    return {
      klass: 'functionCall',
      name: callee.name,
      argumentz: Object.values(funkshunCall.argumentz).map((arg: syno): presentationGraph => {
        return this.presentNode(getSyno(arg), scope, getSyno, focusNodeId);
      }),
      resolved,
      focused
    }
  }

  presentNorCall(
    funkshunCall: functionCall,
    scope: {},
    getSyno: Function,
    focusNodeId: (string | false)
  ) {
    let focused = (funkshunCall.id === focusNodeId)

    return {
      klass: 'functionCall',
      name: 'NOR',
      argumentz: Object.values(funkshunCall.argumentz).map((arg: syno): presentationGraph => {
        return this.presentNode(getSyno(arg), scope, getSyno, focusNodeId);
      }),
      resolved: true,
      focused
    }
  }
}
