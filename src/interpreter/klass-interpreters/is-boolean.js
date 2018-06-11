// @flow
import type { booleanLiteral } from '../../types/syntactic-nodes/boolean-literal' // eslint-disable-line no-unused-vars

// This should be caught by flow, but let's double check
export default (booleanCandidate: booleanLiteral): boolean => {
  const keys = Object.keys(booleanCandidate);

  if (keys.length !== 2) { return false; }
  if (!keys.includes('klass')) { return false; }
  if (!keys.includes('value')) { return false; }
  if (booleanCandidate.klass !== 'booleanLiteral') { return false; }
  if (![true, false].includes(booleanCandidate.value)) { return false; }

  return true;
}
