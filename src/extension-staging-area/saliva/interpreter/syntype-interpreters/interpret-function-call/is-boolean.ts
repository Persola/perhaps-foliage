import type { BooleanLiteral } from "../../../types/synos/boolean-literal";

export default ((booleanCandidate: BooleanLiteral): boolean => {
  const leKeys = Object.keys(booleanCandidate);

  if (!(leKeys.length === 4)) {
    return false;
  }

  if (!leKeys.includes('syntype')) {
    return false;
  }

  if (!leKeys.includes('value')) {
    return false;
  }

  if (booleanCandidate.syntype !== 'booleanLiteral') {
    return false;
  }

  if (![true, false].includes(booleanCandidate.value)) {
    return false;
  }

  return true;
});