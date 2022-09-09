import { ActualGrammar } from '../grammar/actual-grammar';
import { SyntypeSchema } from '../syntype-schema/syntype-schema';
import { KeyToNewSynoAttrs } from '../language-integration/key-to-new-syno-attrs';
import { TreeList } from '../syntactic/newnew/tree-list';
import { Focus } from './focus';

export type EditorState = {
  readonly integrationId: string | null;
  readonly actualGrammar: ActualGrammar | null;
  readonly syntypeSchema: SyntypeSchema | null;
  readonly keyToNewSynoAttrs: KeyToNewSynoAttrs | null;
  readonly trees: TreeList | null;
  readonly primitivesTreeId: string | null;
  readonly editeeTreeId: string | null;
  readonly resultTreeId: string | null;
  readonly focus: Focus | null;
  readonly interpreting: boolean;
  readonly resultOutdated: boolean;
  readonly loadingIntegration: boolean;
  readonly loadingSyntree: boolean;
};
