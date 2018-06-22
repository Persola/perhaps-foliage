// @flow
import type { BooleanLiteral } from '../../../types/syntactic-nodes/boolean-literal' // eslint-disable-line no-unused-vars
import type { BooleanLiteralAttrs } from '../../../types/syntactic-nodes/syno-attrs/boolean-literal-attrs' // eslint-disable-line no-unused-vars

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
