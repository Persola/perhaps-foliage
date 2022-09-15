import type { ReplaceFocusedSyno } from '../../../types/actions/commands/replace-focused-syno';
import type { MainsideLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-lang-int';
import type { KeyToNewSynoAttrs } from '../../../types/language-integration/key-to-new-syno-attrs';
import type { UnistlikeEdit } from '../../../types/unistlike/unistlike-edit';
import type { Warn } from '../../../types/cross-context/warn';
import type StateMutator from '../../mutators/state-mutator';
import type StateSelector from '../../selectors/state-selector';

export default (
  action: ReplaceFocusedSyno,
  readState: StateSelector,
  writeState: StateMutator,
  integration: MainsideLangInt,
  latestEdit: UnistlikeEdit[],
  warnUser: Warn,
): void => {
  if (readState.integrationLoaded() === false) {
    warnUser('Ignoring REPLACE_FOCUSED_SYNO action: no integration loaded');
    return;
  }

  if (readState.treeLoaded() === false) {
    warnUser('Ignoring REPLACE_FOCUSED_SYNO action: no tree loaded');
    return;
  }

  latestEdit.push({
    undo: {
      type: 'REPLACE_SYNO',
    },
    redo: {
      type: 'REPLACE_SYNO',
    },
  });

  writeState.focusedSyno().destroy();
  writeState.editeeTree().addSyno(
    readState.focusedSyno().parent().id,
    readState.focusedSyno().index(),
    readState.focusedSyno().rootwardEdgeLabel,
    action.newSynoAttrs,
  );
  writeState.state.resultOutdated = true;
};
