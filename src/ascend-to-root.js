// @flow
import type { syntacticGraph } from './types/syntactic-graph.js'

export default (startingSyno: syntacticGraph, getSyno: Function) => {
  let currentSyno = startingSyno;
  while (currentSyno.parent) {
    currentSyno = getSyno(currentSyno.parent);
  }

  return currentSyno;
}
