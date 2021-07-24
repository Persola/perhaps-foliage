import type { Prestree } from './prestree';

export type EditorPresentation = {
  readonly stage: Prestree | null | undefined;
  readonly result: Prestree | null | undefined;
};
