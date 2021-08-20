import type { Action } from 'redux';

export interface UnistlikeEdit {
  readonly undo: Action;
  readonly redo: Action;
}
