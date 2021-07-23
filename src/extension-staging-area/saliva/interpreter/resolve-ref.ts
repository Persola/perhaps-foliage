import type { SynoRef } from "../../../types/syno-ref";
import type { LiteralValue } from "../types/synos/literal-value";
export default ((parentScope: [], ref: SynoRef): LiteralValue => {
  const matchingParamRes = parentScope.find(paramRes => paramRes[0].id === ref.id);

  if (!matchingParamRes) {
    throw new Error('no matching parameter');
  }

  return matchingParamRes[1];
});