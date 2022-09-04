import { SynoAttrVal } from './syno-attr-val';

export type TypeAttrs = {
  syntype: string;
  [syntypeSpecificSynoAttr: string]: SynoAttrVal;
};
