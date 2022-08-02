import type { UnistlikeEdit } from './unistlike/unistlike-edit';
import type { StateSelector } from './state-selector';
import type { MainsidePresentLangInt } from './language-integration/interfaces/mainside/mainside-present-lang-int';
import type { SynoMap } from './syntactic/syno-map';

export interface DocumentStateTrackerInterface {
  setStateSelector(stateSelector: StateSelector): void,
  getState(): SynoMap,
}

export type VscodeMainParams = {
  emitDocumentChange: (edit: UnistlikeEdit) => void,
  documentStateTracker: DocumentStateTrackerInterface,
  initialLangInt: MainsidePresentLangInt,
  initialDocument: SynoMap,
};
