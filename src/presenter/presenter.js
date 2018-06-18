// @flow
import createSynoFetcher from '../syntree-utils/create-syno-fetcher.js'
import ascendToRoot from '../syntree-utils/ascend-to-root.js'
import presentFocusedSyno from './presenters/present-focused-syno.js'
import presentSyno from './presenters/present-syno.js'

import type { editorState } from '../types/editor-state.js' // eslint-disable-line no-unused-vars

import type { syno } from '../types/syno.js' // eslint-disable-line no-unused-vars
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
      stage: presentFocusedSyno(stagedSyno, {}, getSyno, stagedNodeId),
      result: presentSyno(resultSyno, {}, getSyno, false)
    };
  }
}
