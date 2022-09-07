import Syno from '../main-process/syntactic-interface/newnew/readable/syno';
import SyntaxTree from '../main-process/syntactic-interface/newnew/readable/syntax-tree';

import type { EditorState } from './editor-state/editor-state';
import type { ActualGrammar } from './grammar/actual-grammar';
import type { KeyToNewSynoAttrs } from './language-integration/key-to-new-syno-attrs';
import type { Focus } from './editor-state/focus';
import type { SyntypeSchema } from './syntype-schema/syntype-schema';
import type { AbsoluteSynoUri } from './syntactic/newnew/syno-uri';

export type StateSelector = {
  // state
  state: EditorState;
  // first-level accessors
  integrationId: () => string;
  actualGrammar: () => ActualGrammar;
  syntypeSchema: () => SyntypeSchema;
  keyToNewSynoAttrs: () => KeyToNewSynoAttrs;
  primitives: () => SyntaxTree;
  editeeTree: () => SyntaxTree;
  resultTree: () => SyntaxTree;
  focus: () => Focus;
  interpreting: () => boolean;
  resultOutdated: () => boolean;
  loadingIntegration: () => boolean;
  loadingSyntree: () => boolean;
  // deeper accessors
  focusedSynoId: () => string;
  focusedPresnoIndex: () => number;
  focusedCharIndex: () => number;
  // loaded
  treeLoaded: () => boolean;
  integrationLoaded: () => boolean;
  // synos
  getEditeeSyno: (synoId: string) => Syno;
  getSynoByUri: (synoUri: AbsoluteSynoUri) => Syno;
  focusedSyno: () => Syno;
  isPrimitive: (synoId: string) => boolean;
  // focus
  inNonSynPresno: () => boolean;
  inText: () => boolean;
};
