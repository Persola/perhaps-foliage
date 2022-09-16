import StateSelector from './state-selector';
import MutableSyntaxTree from './syntactic-interface/writable/mutable-syntax-tree';
import MutableSyno from './syntactic-interface/writable/mutable-syno';

import type { ActualGrammar } from '../../types/grammar/actual-grammar';
import type { SyntacticTypeSchema } from '../../types/language-integration/syntactic-type-schema/syntactic-type-schema';
import type { KeyToNewSynoAttrs } from '../../types/language-integration/key-to-new-syno-attrs';
import type { AbsoluteSynoUri } from '../../types/syntactic/syno-uri';
import type { MutableEditorState } from '../../types/editor-state/mutable/mutable-editor-state';
import type { MutableFocus } from '../../types/editor-state/mutable/mutable-focus';

export default class StateMutator {
  /*
    The state property is an immer'd proxy.

    StateMutator instances can only be used from when they are instantiated until
    the next state update because they reference a specific version of the state
  */
  state: MutableEditorState;
  private selector: StateSelector;

  constructor(state: MutableEditorState) {
    this.state = state; // immer'd
    this.selector = new StateSelector(state);
  }

  // trees
  primitives(): MutableSyntaxTree {
    if (this.state.primitivesTreeId === null) {
      return null;
    }

    return new MutableSyntaxTree(
      this.state.primitivesTreeId,
      this.state.trees,
    );
  }

  editeeTree(): MutableSyntaxTree {
    if (this.state.editeeTreeId === null) {
      return null;
    }

    return new MutableSyntaxTree(
      this.state.editeeTreeId,
      this.state.trees,
    );
  }

  resultTree(): MutableSyntaxTree {
    if (this.state.resultTreeId === null) {
      return null;
    }

    return new MutableSyntaxTree(
      this.state.resultTreeId,
      this.state.trees,
    );
  }

  // synos
  getSynoByUri(uri: AbsoluteSynoUri): MutableSyno {
    const uriTreeHost = uri.treeHost.join('.');
    const tree = [
      this.editeeTree(),
      this.primitives(),
      this.resultTree(),
    ].find(t => t !== null && t.id === uriTreeHost);

    if (!tree) {
      throw new Error(`Cannot retrieve syno from unloaded tree '${uriTreeHost}'`);
    }

    let currentSyno = tree.root();
    for (const step of uri.path) {
      if (!currentSyno.hasChildAt(step)) {
        throw new TypeError(`Tree ('${uriTreeHost}') has no syno at '${uri.path.join('/')}'`);
      }
      currentSyno = currentSyno.childAt(step);
    }

    const syno = currentSyno;

    return syno;
  }

  focusedSyno(): MutableSyno {
    return this.editeeTree().getSyno(this.focusedSynoId());
  }

  focus(): MutableFocus { return this.selector.focus(); }

  // forward reads to selector
  integrationId(): string { return this.selector.integrationId(); }
  actualGrammar(): ActualGrammar { return this.selector.actualGrammar(); }
  syntacticTypeSchema(): SyntacticTypeSchema { return this.selector.syntacticTypeSchema(); }
  keyToNewSynoAttrs(): KeyToNewSynoAttrs { return this.selector.keyToNewSynoAttrs(); }
  interpreting(): boolean { return this.selector.interpreting(); }
  resultOutdated(): boolean { return this.selector.resultOutdated(); }
  loadingIntegration(): boolean { return this.selector.loadingIntegration(); }
  loadingSyntree(): boolean { return this.selector.loadingSyntree(); }
  treeLoaded(): boolean { return this.selector.treeLoaded(); }
  integrationLoaded(): boolean { return this.selector.integrationLoaded(); }
  inNonSynPresno(): boolean { return this.selector.inNonSynPresno(); }
  inText(): boolean { return this.selector.inText(); }
  focusedSynoId(): string { return this.selector.focusedSynoId(); }
  focusedPresnoIndex(): null | number { return this.selector.focusedPresnoIndex(); }
  focusedCharIndex(): null | number { return this.selector.focusedCharIndex(); }
}
