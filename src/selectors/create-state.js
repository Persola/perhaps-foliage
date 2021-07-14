// @flow
import type { StateSelector } from '../types/state-selector';
import type { EditorState } from '../types/editor-state';
import type { Syno } from '../types/syno';
import type { SalivaSelectors } from '../extension-staging-area/saliva/types/selectors';
import type { Syntype } from '../extension-staging-area/saliva/types/synos/syntype';
import NorPrimitiveId from '../extension-staging-area/saliva/nor-primitive-id.js';

export default (
  initialEditorState: EditorState,
  salivaSelectors: SalivaSelectors,
): StateSelector => {
  const languageNeutralSelectors = {
    // state
    state: initialEditorState, // gets updated in app.js
    // first-level accessors
    grammar: function grammar() { return this.state.grammar; },
    grammarName: function grammarName() { return this.state.grammarName; },
    textHostRefs: function textHostRefs() { return this.state.textHostRefs; },
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
    getSyno: function getSyno(synoId: string, assertedSyntype: ?Syntype): Syno {
      const maybeSyno = this.state.synoMap[synoId];
      if (!maybeSyno) {
        throw new TypeError('state selector was asked to fetch a syno with an unused ID');
      }
      if (assertedSyntype && (maybeSyno.syntype !== assertedSyntype)) {
        throw new Error("fetched syno's syntype didn't match asserted syntype");
      }
      return maybeSyno;
    },
    focusedSyno: function focusedSyno() {
      return this.getSyno(this.focusedSynoId());
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
    focusedSynoIsPrimitive: function focusedSynoIsPrimitive() {
      return (
        this.focusedSynoId() === NorPrimitiveId
        || (
          !this.focusedSynoIsRoot()
          && this.focusedSyno().parent.id === NorPrimitiveId
        )
      );
    },

  };

  return {
    ...salivaSelectors,
    ...languageNeutralSelectors,
  };
};
