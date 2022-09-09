import type { SynoAttrVal } from './syno-attr-val';

type Attrs = {
  [attrName: string]: SynoAttrVal
};

export type ExtratreeRefs = {
  [edgeLabel: string]: string // value is stringified syno URI
};

type LabeledChild = [
  string, // edgeLabel
  SerializedSyno, // child
];

export type SerializedSyno = {
  type: string;
  attrs: Attrs;
  extratreeRefs: ExtratreeRefs;
  children: LabeledChild[];
};
