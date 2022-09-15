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
  attrs?: Attrs; // not included is equivalent to empty
  extratreeRefs?: ExtratreeRefs; // not included is equivalent to empty
  children?: LabeledChild[]; // not included is equivalent to empty
};
