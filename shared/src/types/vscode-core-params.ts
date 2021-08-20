import type { UnistlikeEdit } from './unistlike/unistlike-edit';
import type { StateSelector } from './state-selector';
import type { CoresidePresentLanguageIntegration } from './language-integration/coreside-present-language-integration';
import type { SynoMap } from './syntactic/syno-map';

export interface DocumentStateTrackerInterface {
  setStateSelector(stateSelector: StateSelector): void,
  getState(): SynoMap,
}

export type VscodeCoreParams = {
  emitDocumentChange: (edit: UnistlikeEdit) => void,
  documentStateTracker: DocumentStateTrackerInterface,
  initialLanguageIntegration: CoresidePresentLanguageIntegration,
  initialDocument: SynoMap,
};
