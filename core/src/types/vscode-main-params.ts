import SyntaxTree from '../main-process/syntactic-interface/newnew/readable/syntax-tree';

import type { UnistlikeEdit } from './unistlike/unistlike-edit';
import type { MainsidePresentLangInt } from './language-integration/interfaces/mainside/mainside-present-lang-int';
import StateSelector from '../main-process/selectors/state-selector';

export type DocumentStateTrackerInterface = {
  setStateSelector(stateSelector: StateSelector): void,
  getState(): SyntaxTree,
}

export type VscodeMainParams = {
  emitDocumentChange: (edit: UnistlikeEdit) => void,
  documentStateTracker: DocumentStateTrackerInterface,
  initialLangInt: MainsidePresentLangInt,
  initialDocument: SyntaxTree,
};
