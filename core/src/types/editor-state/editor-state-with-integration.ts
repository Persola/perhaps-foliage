import SyntaxTree from '../../main-process/syntactic-interface/newnew/syntax-tree';

import type { KeyToNewSynoAttrs } from '../language-integration/key-to-new-syno-attrs';
import type { ActualGrammar } from '../grammar/actual-grammar';
import type { Focus } from './focus';
import type { SyntypeSchema } from '../syntype-schema/syntype-schema';

export type EditorStateWithIntegration = {
  readonly integrationId: string;
  readonly actualGrammar: ActualGrammar;
  readonly syntypeSchema: SyntypeSchema;
  readonly keyToNewSynoAttrs: KeyToNewSynoAttrs;
  readonly trees: { [syntaxTreeId: string]: SyntaxTree};
  readonly primitivesTreeId: string;
  readonly editeeTreeId: null | string;
  readonly resultTreeId: null | string;
  readonly focus: Focus;
  readonly interpreting: boolean;
  readonly resultOutdated: boolean;
  readonly loadingIntegration: boolean;
  readonly loadingSyntree: boolean;
};
