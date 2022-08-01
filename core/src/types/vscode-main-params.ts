import type { UnistlikeEdit } from './unistlike/unistlike-edit';
import type { StateSelector } from './state-selector';
import type { MainsidePresentLanguageIntegration } from './language-integration/mainside-present-language-integration';
import type { SynoMap } from './syntactic/syno-map';

export interface DocumentStateTrackerInterface {
  setStateSelector(stateSelector: StateSelector): void,
  getState(): SynoMap,
}

export type VscodeMainParams = {
  emitDocumentChange: (edit: UnistlikeEdit) => void,
  documentStateTracker: DocumentStateTrackerInterface,
  initialLanguageIntegration: MainsidePresentLanguageIntegration,
  initialDocument: SynoMap,
};
