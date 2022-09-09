export type StartSyntreeLoad = {
  readonly type: 'START_SYNTREE_LOAD';
  readonly fileText: string;
  readonly fileType: 'application/json' | 'application/x-yaml';
};
