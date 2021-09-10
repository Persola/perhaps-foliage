import { FunctionDefinition } from '../types/synos/function-definition';

// @ts-ignore how do I configure TS to ignore webpacked imports?
import primitives from '../primitives.yml';

const primitiveIds = Object.keys(primitives);

export default (
  funkshunDef: FunctionDefinition,
): boolean => {
  if (!funkshunDef.body) {
    if (!primitiveIds.includes(funkshunDef.id)) {
      return false;
    }
  }

  return true;
};
