import type { SynoAttrVal } from './syno-attr-val';

export type MutableSyntypeAttrs = {
    syntype: string;
    [syntypeSpecificSynoAttr: string]: SynoAttrVal;
  };
