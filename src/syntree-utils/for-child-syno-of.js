// @flow
import type { Syno } from '../types/syno.js';
import type { SynoRef } from '../types/syno-ref.js';

export default (
  parentSyno: Syno,
  callback: (SynoRef, string, ?number) => void,
) => {
  Object.entries(parentSyno).forEach(([key, val]) => {
    if (
      // $FlowIssue: poorly typed ECMA built-in (Object.entries)
      val.synoRef
      // $FlowIssue: poorly typed ECMA built-in (Object.entries)
      && val.relation === 'child'
    ) {
      // $FlowIssue: poorly typed ECMA built-in (Object.entries)
      callback(val, key);
    } else if (val instanceof Array) { // nested children (arguments, parameters)
      val.forEach((el, index) => {
        if (
          el.synoRef
          && el.relation === 'child'
        ) {
          callback(el, key, index);
        }
      });
    }
  });
};
