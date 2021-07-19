// @flow
export type EditorStateWithoutIntegration = {|
  +integrationId: false,
  +grammar: false,
  +primitives: false,
  +keyToNewSynoAttrs: false,
  +lastIntegrationBindings: (false | string[]),
  +synoMap: false,
  +resultTree: false,
  +inverseReferenceMap: false,
  +focus: false,
  +resultSyntreeRootId: false,
  +interpreting: false,
  +resultOutdated: false,
  +loadingIntegration: boolean,
  +loadingSyntree: false,
|}
