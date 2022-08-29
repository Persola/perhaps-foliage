import type { EditorPresentation } from '../../presenter/editor-presentation';

export type Render = {
  presentation: EditorPresentation,
  resultOutdated: boolean,
  interpreting: boolean,
};
