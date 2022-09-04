import Syno from '../syntactic-interface/newnew/syno';
import SyntaxTree from '../syntactic-interface/newnew/syntax-tree';

import type { StateSelector } from '../../types/state-selector';
import type { EditorState } from '../../types/editor-state/editor-state';
import type { ActualGrammar } from '../../types/grammar/actual-grammar';
import type { SyntypeSchema } from '../../types/syntype-schema/syntype-schema';
import type { KeyToNewSynoAttrs } from '../../types/language-integration/key-to-new-syno-attrs';
import type { Focus } from '../../types/editor-state/focus';
import type { AbsoluteSynoUri } from '../../types/syntactic/newnew/syno-uri';

export default (editorState: EditorState): StateSelector => {
  /*
  The state selector is way most of the app accesses state. The 'state' property should not be
  modified anywhere except in initialize-main-process.ts, which keeps it in sync on state update
 */
  const languageNeutralSelectors = {
  // state
    state: editorState,
    // first-level accessors
    integrationId: function integrationId(): string {
      return this.state.integrationId;
    },
    actualGrammar: function actualGrammar(): ActualGrammar {
      return this.state.actualGrammar;
    },
    syntypeSchema: function syntypeSchema(): SyntypeSchema {
      return this.state.syntypeSchema;
    },
    primitives: function primitives(): SyntaxTree {
      return this.state.trees[this.state.primitivesTreeId];
    },
    keyToNewSynoAttrs: function keyToNewSynoAttrs(): KeyToNewSynoAttrs {
      return this.state.keyToNewSynoAttrs;
    },
    editeeTree: function editeeTree(): SyntaxTree {
      return this.state.trees[this.state.editeeTreeId];
    },
    resultTree: function resultTree(): SyntaxTree {
      return this.state.trees[this.state.resultTreeId];
    },
    focus: function focus(): Focus {
      return this.state.focus;
    },
    interpreting: function interpreting(): boolean {
      return this.state.interpreting;
    },
    resultOutdated: function resultOutdated(): boolean {
      return this.state.resultOutdated;
    },
    loadingIntegration: function loadingIntegration(): boolean {
      return this.state.loadingIntegration;
    },
    loadingSyntree: function loadingSyntree(): boolean {
      return this.state.loadingSyntree;
    },
    // deeper accessors
    focusedSynoId: function focusedSynoId(): number {
      return this.state.focus?.synoId;
    },
    focusedPresnoIndex: function focusedPresnoIndex(): null | number {
      return this.state.focus.presnoIndex;
    },
    focusedCharIndex: function focusedCharIndex(): null | number {
      return this.state.focus.charIndex;
    },
    // loaded
    treeLoaded: function treeLoaded(): boolean {
      return !!this.editeeTree();
    },
    integrationLoaded: function integrationLoaded(): boolean {
      return !!this.state.integrationId;
    },
    // synos
    getEditeeSyno: function getEditeeSyno(synoId: number): Syno {
      return this.editeeTree().getSyno(synoId);
    },
    getSynoByUri: function getSynoByUri(uri: AbsoluteSynoUri): Syno {
      const uriTreeHost = uri.treeHost.join('.');
      const tree = [
        this.editeeTree(),
        this.primitives(),
        this.resultTree(),
      ].find(t => t.id === uriTreeHost);

      if (!tree) {
        throw new Error(`Cannot retrieve syno from unloaded tree '${uriTreeHost}'`);
      }

      if (uri.path.length > 1) {
        throw new Error('unimplemented: deep paths in syno URIs');
      }

      if (typeof uri.path[0] !== 'number') {
        throw new Error("bad syno URI: path doesn't start with child index");
      }

      const syno = tree.root().children()[uri.path[0]];

      if (syno === undefined) {
        throw new TypeError(`Tree ('${uriTreeHost}') has no syno at '${uri.treeHost[0]}'`);
      }

      return syno;
    },
    focusedSyno: function focusedSyno(): Syno {
      return this.editeeTree().getSyno(this.focusedSynoId());
    },
    isPrimitive: function isPrimitive(synoId): boolean {
      return Object.keys(this.primitives().getSyno(synoId)).includes(synoId);
    },
    // focus
    inNonSynPresno: function inNonSynPresno(): boolean {
      return (
        this.state.focus.presnoIndex !== null
        || this.state.focus.budIndex !== null
      );
    },
    inText: function inText(): boolean {
      return this.state.focus.charIndex !== null;
    },
    focusedSynoIsRoot: function focusedSynoIsRoot(): boolean {
      return this.focusedSyno().parent === null;
    },
  };

  return { ...languageNeutralSelectors };
};
