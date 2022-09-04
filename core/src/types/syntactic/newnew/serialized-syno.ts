import type { SynoAttrVal } from './syno-attr-val';
import type { SynoUri } from './syno-uri';

type LabeledChild = [
  string,
  SerializedSyno
];

export type SerializedSyno = {
  type: string;
  children: LabeledChild[];
  extraTreeRefs: {
    [edgeLabel: string]: SynoUri
  };
  attrs: {
    [attrName: string]: SynoAttrVal
  };
};
