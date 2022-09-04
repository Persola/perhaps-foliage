import SyntaxTree from '../../../main-process/syntactic-interface/newnew/syntax-tree';

import type { KeyToNewSynoAttrs } from '../../language-integration/key-to-new-syno-attrs';
import type { ActualGrammar } from '../../grammar/actual-grammar';
import type { MutableFocus } from './mutable-focus';

export type MutableEditorState = {
  integrationId: string | null;
  actualGrammar: ActualGrammar | null;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  trees: { [syntaxTreeId: string]: SyntaxTree};
  primitivesTreeId: string;
  editeeTreeId: null | string;
  resultTreeId: null | string;
  focus: MutableFocus | null;
  interpreting: boolean;
  resultOutdated: boolean;
  loadingIntegration: boolean;
  loadingSyntree: boolean;
};
