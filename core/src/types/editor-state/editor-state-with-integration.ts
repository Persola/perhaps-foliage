import type { SynoMap } from '../syntactic/syno-map';
import type { InverseReferenceMap } from './inverse-reference-map';
import type { KeyToNewSynoAttrs } from '../language-integration/key-to-new-syno-attrs';
import type { ActualGrammar } from '../grammar/actual-grammar';
import type { Focus } from './focus';
import type { ResultSyntreeRootId } from './result-syntree-root-id';
import type { SyntypeSchema } from '../syntype-schema/syntype-schema';

export type EditorStateWithIntegration = {
  readonly integrationId: string;
  readonly actualGrammar: ActualGrammar;
  readonly syntypeSchema: SyntypeSchema;
  readonly primitives: SynoMap;
  readonly keyToNewSynoAttrs: KeyToNewSynoAttrs;
  readonly lastIntegrationBindings: string[] | null;
  readonly synoMap: SynoMap;
  readonly resultTree: SynoMap;
  readonly inverseReferenceMap: InverseReferenceMap;
  readonly focus: Focus;
  readonly resultSyntreeRootId: ResultSyntreeRootId;
  readonly interpreting: boolean;
  readonly resultOutdated: boolean;
  readonly loadingIntegration: boolean;
  readonly loadingSyntree: boolean;
};
