import Syno from '../syntactic-interface/newnew/readable/syno';
import SyntaxTree from '../syntactic-interface/newnew/readable/syntax-tree';

import type { EditorState } from '../../types/editor-state/editor-state';
import type { ActualGrammar } from '../../types/grammar/actual-grammar';
import type { SyntacticTypeSchema } from '../../types/syntactic-type-schema/syntactic-type-schema';
import type { KeyToNewSynoAttrs } from '../../types/language-integration/key-to-new-syno-attrs';
import type { Focus } from '../../types/editor-state/focus';
import type { AbsoluteSynoUri } from '../../types/syntactic/newnew/syno-uri';

export default class StateSelector {
  // state is synced in updateState to point to the Redux state
  private state: EditorState;

  constructor(state: EditorState) {
    this.state = state;
  }

  updateState(newState: EditorState): void {
    /*
      This method should only be called in one place where it is used each time the Redux state
      is updated
    */
    this.state = newState;
  }

  // first-level accessors
  integrationId(): string {
    return this.state.integrationId;
  }

  actualGrammar(): ActualGrammar {
    return this.state.actualGrammar;
  }

  syntacticTypeSchema(): SyntacticTypeSchema {
    return this.state.syntacticTypeSchema;
  }

  keyToNewSynoAttrs(): KeyToNewSynoAttrs {
    return this.state.keyToNewSynoAttrs;
  }

  focus(): Focus {
    return this.state.focus;
  }

  interpreting(): boolean {
    return this.state.interpreting;
  }

  resultOutdated(): boolean {
    return this.state.resultOutdated;
  }

  loadingIntegration(): boolean {
    return this.state.loadingIntegration;
  }

  loadingSyntree(): boolean {
    return this.state.loadingSyntree;
  }

  // trees
  primitives(): SyntaxTree {
    if (this.state.primitivesTreeId === null) {
      return null;
    }

    return new SyntaxTree(
      this.state.primitivesTreeId,
      this.state.trees,
    );
  }

  editeeTree(): SyntaxTree {
    if (this.state.editeeTreeId === null) {
      return null;
    }

    return new SyntaxTree(
      this.state.editeeTreeId,
      this.state.trees,
    );
  }

  resultTree(): SyntaxTree {
    if (this.state.resultTreeId === null) {
      return null;
    }

    return new SyntaxTree(
      this.state.resultTreeId,
      this.state.trees,
    );
  }

  // deeper accessors
  focusedSynoId(): string {
    return this.state.focus?.synoId;
  }

  focusedPresnoIndex(): null | number {
    return this.state.focus.presnoIndex;
  }

  focusedCharIndex(): null | number {
    return this.state.focus.charIndex;
  }

  // loaded
  treeLoaded(): boolean {
    return !!this.editeeTree();
  }

  integrationLoaded(): boolean {
    return !!this.state.integrationId;
  }

  // synos
  getEditeeSyno(synoId: string): Syno {
    return this.editeeTree().getSyno(synoId);
  }

  getSynoByUri(uri: AbsoluteSynoUri): Syno {
    const uriTreeHost = uri.treeHost.join('.');
    const tree = [
      this.editeeTree(),
      this.primitives(),
      this.resultTree(),
    ].find(t => t !== null && t.id === uriTreeHost);

    if (!tree) {
      throw new Error(`Cannot retrieve syno from unloaded tree '${uriTreeHost}'`);
    }

    return tree.getSynoByPath(uri.path);
  }

  focusedSyno(): Syno {
    return this.editeeTree().getSyno(this.focusedSynoId());
  }

  isPrimitive(synoId: string): boolean {
    return this.primitives().hasSyno(synoId);
  }

  // focus
  inNonSynPresno(): boolean {
    return (
      this.state.focus.presnoIndex !== null
      || this.state.focus.budIndex !== null
    );
  }

  inText(): boolean {
    return this.state.focus.charIndex !== null;
  }
}
