export type KeyToNewSynoAttrs = Readonly<{
  [input: string]: {
    syntype: string;
    [typeSpecificSynoAttr: string]: unknown;
  };
}>;
