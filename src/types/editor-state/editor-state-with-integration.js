// @flow
import type { SynoMap } from '../syno-map';
import type { InverseReferenceMap } from './inverse-reference-map';
import type { KeyToNewSynoAttrs } from '../language-integration/key-to-new-syno-attrs';
import type { Grammar } from './grammar';
import type { Focus } from './focus';
import type { ResultSyntreeRootId } from './result-syntree-root-id';
import type { ResultOutdated } from './result-outdated';
import type { Interpreting } from './interpreting';
import type { LoadingSyntree } from './loading-syntree';

export type EditorStateWithIntegration = {|
  +integrationId: string,
  +grammar: Grammar,
  +primitives: SynoMap,
  +keyToNewSynoAttrs: KeyToNewSynoAttrs,
  +lastIntegrationBindings: (false | string[]),
  +synoMap: SynoMap,
  +resultTree: SynoMap,
  +inverseReferenceMap: InverseReferenceMap,
  +focus: Focus,
  +resultSyntreeRootId: ResultSyntreeRootId,
  +interpreting: Interpreting,
  +resultOutdated: ResultOutdated,
  +loadingIntegration: boolean,
  +loadingSyntree: LoadingSyntree,
|}
