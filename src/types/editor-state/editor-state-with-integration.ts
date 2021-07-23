// @flow
import type { SynoMap } from '../syno-map';
import type { InverseReferenceMap } from './inverse-reference-map';
import type { KeyToNewSynoAttrs } from '../language-integration/key-to-new-syno-attrs';
import type { Grammar } from './grammar';
import type { Focus } from './focus';
import type { ResultSyntreeRootId } from './result-syntree-root-id';

export type EditorStateWithIntegration = {|
  +integrationId: string,
  +grammar: Grammar,
  +primitives: SynoMap,
  +keyToNewSynoAttrs: KeyToNewSynoAttrs,
  +lastIntegrationBindings: ?(string[]),
  +synoMap: SynoMap,
  +resultTree: SynoMap,
  +inverseReferenceMap: InverseReferenceMap,
  +focus: Focus,
  +resultSyntreeRootId: ResultSyntreeRootId,
  +interpreting: boolean,
  +resultOutdated: boolean,
  +loadingIntegration: boolean,
  +loadingSyntree: boolean,
|}
