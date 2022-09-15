import { ActualGrammar } from '../grammar/actual-grammar';
import { SyntacticTypeSchema } from '../language-integration/syntactic-type-schema/syntactic-type-schema';
import { KeyToNewSynoAttrs } from '../language-integration/key-to-new-syno-attrs';
import { TreeList } from '../syntactic/tree-list';
import { Focus } from './focus';

export type EditorState = {
  readonly integrationId: string | null;
  readonly actualGrammar: ActualGrammar | null;
  readonly syntacticTypeSchema: SyntacticTypeSchema | null;
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
