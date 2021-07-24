export type EditorStateWithoutIntegration = {
  readonly integrationId: null;
  readonly grammar: null;
  readonly primitives: null;
  readonly keyToNewSynoAttrs: null;
  readonly lastIntegrationBindings: string[] | null;
  readonly synoMap: null;
  readonly resultTree: null;
  readonly inverseReferenceMap: null;
  readonly focus: null;
  readonly resultSyntreeRootId: null;
  readonly interpreting: false;
  readonly resultOutdated: false;
  readonly loadingIntegration: boolean;
  readonly loadingSyntree: false;
};
