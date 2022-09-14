import StateSelector from '../../selectors/state-selector';
import StateMutator from '../../mutators/state-mutator';

import type { EndInterpretation } from '../../../types/actions/end-interpretation';
import type { Warn } from '../../../types/cross-context/warn';
import type { RawSyntaxTree } from '../../../types/syntactic/newnew/raw/raw-syntax-tree';
import type { TreeList } from '../../../types/syntactic/newnew/tree-list';

export default (
  writeState: StateMutator,
  action: EndInterpretation,
  readState: StateSelector,
  warnUser: Warn,
): void => {
  if (readState.integrationLoaded() === false) {
    warnUser('Ignoring END_INTERPRETATION action: no integration loaded');
    return;
  }

  if (readState.treeLoaded() === false) {
    warnUser('Ignoring END_INTERPRETATION action: no tree loaded');
    return;
  }

  if (!readState.interpreting()) {
    throw new Error('Attempted to stop interpreting while not interpreting');
  }

  const result: RawSyntaxTree = action.result;
  const treeId = 'result_tree';
  const treeToAdd: TreeList = {};
  treeToAdd[treeId] = result;

  Object.assign(writeState.state, {
    trees: {
      ...writeState.state.trees,
      ...treeToAdd,
    },
    resultTreeId: treeId,
    interpreting: false,
    resultOutdated: false,
  });
};
