import type { Action } from 'redux';

export type UnistlikeEdit = {
  readonly undo: Action;
  readonly redo: Action;
}
