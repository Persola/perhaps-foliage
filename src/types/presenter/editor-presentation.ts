import type { Prestree } from './prestree';

export type EditorPresentation = {
  readonly stage: Prestree | null;
  readonly result: Prestree | null;
};
