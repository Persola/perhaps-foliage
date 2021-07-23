// @flow
export type EditorStateWithoutIntegration = {|
  +integrationId: null,
  +grammar: null,
  +primitives: null,
  +keyToNewSynoAttrs: null,
  +lastIntegrationBindings: ?(string[]),
  +synoMap: null,
  +resultTree: null,
  +inverseReferenceMap: null,
  +focus: null,
  +resultSyntreeRootId: null,
  +interpreting: false,
  +resultOutdated: false,
  +loadingIntegration: boolean,
  +loadingSyntree: false,
|}
