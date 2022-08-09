import type { StateSelector } from '../types/state-selector';
import type { EditorState } from '../types/editor-state';
import type { Syno } from '../types/syntactic/syno';

export default (editorState: EditorState): StateSelector => {
  /*
  The state selector is way most of the app accesses state. The 'state' property should not be
  modified anywhere except in initialize-main-process.ts, which keeps it in sync on state update
 */
  const languageNeutralSelectors = {
  // state
    state: editorState,
    // first-level accessors
    integrationId: function grammar() {
      return this.state.integrationId;
    },
    grammar: function grammar() {
      return this.state.grammar;
    },
    primitives: function primitives() {
      return this.state.primitives;
    },
    keyToNewSynoAttrs: function keyToNewSynoAttrs() {
      return this.state.keyToNewSynoAttrs;
    },
    lastIntegrationBindings: function lastIntegrationBindings() {
      return this.state.lastIntegrationBindings;
    },
    synoMap: function synoMap() {
      return this.state.synoMap;
    },
    resultTree: function resultTree() {
      return this.state.resultTree;
    },
    inverseReferenceMap: function inverseReferenceMap() {
      return this.state.inverseReferenceMap;
    },
    focus: function focus() {
      return this.state.focus;
    },
    resultSyntreeRootId: function resultSyntreeRootId() {
      return this.state.resultSyntreeRootId;
    },
    interpreting: function interpreting() {
      return this.state.interpreting;
    },
    resultOutdated: function resultOutdated() {
      return this.state.resultOutdated;
    },
    loadingIntegration: function loadingIntegration() {
      return this.state.loadingIntegration;
    },
    loadingSyntree: function loadingSyntree() {
      return this.state.loadingSyntree;
    },
    // deeper accessors
    focusedSynoId: function focusedSynoId() {
      return this.state.focus?.synoId;
    },
    focusedPresnoIndex: function focusedPresnoIndex() {
      return this.state.focus.presnoIndex;
    },
    focusedCharIndex: function focusedCharIndex() {
      return this.state.focus.charIndex;
    },
    // loaded
    treeLoaded: function treeLoaded() {
      return !!this.state.synoMap;
    },
    integrationLoaded: function integrationLoaded() {
      return !!this.state.integrationId;
    },
    // synos
    getSyno: function getSyno(synoId: string): Syno {
      let maybeSyno;
      maybeSyno = this.state.synoMap[synoId];

      if (!maybeSyno && this.state.primitives) {
        maybeSyno = this.state.primitives[synoId];
      }

      if (!maybeSyno) {
        maybeSyno = this.state.resultTree[synoId];
      }

      if (!maybeSyno) {
        throw new TypeError(`cannot find syno with ID '${synoId}'`);
      }

      return maybeSyno;
    },
    focusedSyno: function focusedSyno() {
      return this.getSyno(this.focusedSynoId());
    },
    isPrimitive: function isPrimitive(synoId) {
      return Object.keys(this.state.primitives).includes(synoId);
    },
    // focus
    inPresno: function inPresno() {
      return this.state.focus.presnoIndex !== null;
    },
    inText: function inText() {
      return this.state.focus.charIndex !== null;
    },
    focusedSynoIsRoot: function focusedSynoIsRoot() {
      return !this.focusedSyno().parent;
    },
  };
  return { ...languageNeutralSelectors };
};
