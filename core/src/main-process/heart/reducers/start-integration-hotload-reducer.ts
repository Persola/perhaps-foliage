import type { MutableEditorState } from '../../../types/editor-state/mutable/mutable-editor-state';

export default (draftState: MutableEditorState): void => {
  draftState.loadingIntegration = true;
};
