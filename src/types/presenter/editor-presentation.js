// @flow
import type { Prestree } from './prestree';

export type EditorPresentation = {|
  +stage: ?Prestree,
  +result: ?Prestree,
|};
