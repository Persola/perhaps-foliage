import type { Syno } from "../types/syno";
import type { SynoRef } from "../types/syno-ref";
export default (
  parentSyno: Syno,
  callback: (arg0: SynoRef, arg1: string, arg2?: number) => void
) => {
  Object.entries(parentSyno).forEach(([key, val]) => {
    if (
      // $FlowIssue: poorly typed ECMA built-in (Object.entries)
      val.synoRef && // $FlowIssue: poorly typed ECMA built-in (Object.entries)
      val.relation === "child"
    ) {
      // $FlowIssue: poorly typed ECMA built-in (Object.entries)
      callback(val, key);
    } else if (val instanceof Array) {
      // nested children
      val.forEach((el, index) => {
        if (el.synoRef && el.relation === "child") {
          callback(el, key, index);
        }
      });
    }
  });
};
