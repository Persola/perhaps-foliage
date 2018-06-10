// @flow
import type { syntacticGraph } from '../types/syntactic-graph' // eslint-disable-line no-unused-vars

export default (functionNode: any, argumentz: any[]) => { // eslint-disable-line no-unused-vars
  // for now, just return a static value
  return {
    klass: 'booleanLiteral',
    value: true
  };
}
