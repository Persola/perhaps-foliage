// @flow
import type { Prestree } from './prestree';

export type EditorPresentation = {|
  +stage: (Prestree | false),
  +result: (Prestree | false),
|};
