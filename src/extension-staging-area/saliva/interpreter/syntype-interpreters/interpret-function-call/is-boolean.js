// @flow
import type { BooleanLiteral } from '../../../types/synos/boolean-literal'
import type { BooleanLiteralAttrs } from '../../../types/synos/syno-attrs/boolean-literal-attrs'

// This should be caught by flow, but let's double check
export default (booleanCandidate: (BooleanLiteral | BooleanLiteralAttrs)): boolean => {
  const leKeys = Object.keys(booleanCandidate);

  if (!leKeys.length === 2) { return false; }
  if (!leKeys.includes('syntype')) { return false; }
  if (!leKeys.includes('value')) { return false; }
  if (booleanCandidate.syntype !== 'booleanLiteral') { return false; }
  if (![true, false].includes(booleanCandidate.value)) { return false; }

  return true;
}
