import { ActualGrammar } from '../../grammar/actual-grammar';
import { SyntypeSchema } from '../../syntype-schema/syntype-schema';
import { KeyToNewSynoAttrs } from '../../language-integration/key-to-new-syno-attrs';
import { TreeList } from '../../syntactic/newnew/tree-list';
import { MutableFocus } from './mutable-focus';

export type MutableEditorState = {
  // MutableEditorState instances are immer'd proxies
  integrationId: string | null;
  actualGrammar: ActualGrammar | null;
  syntypeSchema: SyntypeSchema | null;
  keyToNewSynoAttrs: KeyToNewSynoAttrs | null;
  trees: TreeList | null;
  primitivesTreeId: string | null;
  editeeTreeId: string | null;
  resultTreeId: string | null;
  focus: MutableFocus | null;
  interpreting: boolean;
  resultOutdated: boolean;
  loadingIntegration: boolean;
  loadingSyntree: boolean;
};
