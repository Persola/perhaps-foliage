import type { MutableEditorState } from '../../../types/mutable-editor-state';

export default (draftState: MutableEditorState): void => {
  draftState.loadingIntegration = true;
};
