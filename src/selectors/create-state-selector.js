// @flow
import type { StateSelector } from '../types/state-selector';
import type { EditorState } from '../types/editor-state';
import type { Syno } from '../types/syno';

export default (
  initialEditorState: EditorState,
): StateSelector => {
  /*
    The state selector is way most of the app accesses state. Its data should not be modified
    anywhere except in app.js, which keeps it in sync on state update
  */
  const languageNeutralSelectors = {
    // state
    state: initialEditorState,
    // first-level accessors
    grammar: function grammar() { return this.state.grammar; },
    grammarName: function grammarName() { return this.state.grammarName; },
    primitives: function primitives() { return this.state.primitives; },
    synoMap: function synoMap() { return this.state.synoMap; },
    inverseReferenceMap: function inverseReferenceMap() { return this.state.inverseReferenceMap; },
    focus: function focus() { return this.state.focus; },
    resultSyntreeRootId: function resultSyntreeRootId() { return this.state.resultSyntreeRootId; },
    interpreting: function interpreting() { return this.state.interpreting; },
    resultOutdated: function resultOutdated() { return this.state.resultOutdated; },
    loadingSyntree: function loadingSyntree() { return this.state.loadingSyntree; },
    // deeper accessors
    focusedSynoId: function focusedSynoId() {
      return this.state.focus.synoId;
    },
    focusedPresnoIndex: function focusedPresnoIndex() {
      return this.state.focus.presnoIndex;
    },
    focusedCharIndex: function focusedCharIndex() {
      return this.state.focus.charIndex;
    },
    // synos
    getSyno: function getSyno(synoId: string): Syno {
      let maybeSyno;
      maybeSyno = this.state.primitives[synoId];
      if (!maybeSyno) {
        maybeSyno = this.state.synoMap[synoId];
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
      return this.state.focus.presnoIndex !== false;
    },
    inText: function inText() {
      return this.state.focus.charIndex !== false;
    },
    focusedSynoIsRoot: function focusedSynoIsRoot() {
      return this.focusedSyno().parent === false;
    },
  };

  return {
    ...languageNeutralSelectors,
  };
};
