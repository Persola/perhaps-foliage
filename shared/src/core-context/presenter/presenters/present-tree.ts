import forChildSynoOf from '../../../syntree-utils/for-child-syno-of';
import presentSyno from './present-syno';
import ascendToRoot from '../../../syntree-utils/ascend-to-root';

import type { StateSelector } from '../../../types/state-selector';
import type { SynoId } from '../../../types/syntactic/syno-id';
import type { SynoMap } from '../../../types/syntactic/syno-map';
import type { Prestree } from '../../../types/presenter/prestree';
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map';
import type { PresnoMap } from '../../../types/presenter/presno-map';
import type { CoresidePresentLanguageIntegration } from '../../../types/language-integration/coreside-present-language-integration';
import type { Focus } from '../../../types/editor-state/focus';

const subtreeNodeIds = (state: StateSelector, rootId: string) => {
  const nodeIds = [rootId];

  forChildSynoOf(state.getSyno(rootId), synoRef => {
    nodeIds.push(...subtreeNodeIds(state, synoRef.id)); //eslint-disable-line
  });

  return nodeIds;
};

const synosToPresentIds = (
  state: StateSelector,
  renderEntryTree: SynoMap,
  renderEntrySynoId: string,
) => {
  const rootId: SynoId = ascendToRoot(
    renderEntrySynoId,
    renderEntryTree,
  ).id;

  return subtreeNodeIds(state, rootId);
};

export default (
  state: StateSelector,
  integration: CoresidePresentLanguageIntegration,
  renderEntrySynoId: SynoId,
  renderEntryTree: SynoMap,
  focus: Focus,
): Prestree => {
  const mutablePresnoMap: MutablePresnoMap = {};
  synosToPresentIds(
    state,
    renderEntryTree,
    renderEntrySynoId,
  ).forEach(synoId => {
    if (typeof mutablePresnoMap[synoId] !== 'undefined') {
      throw new Error('attempted to overwrite presno!');
    }

    mutablePresnoMap[synoId] = presentSyno(
      synoId,
      state,
      integration,
      focus,
    );
  });

  const immutablePresnoMap = mutablePresnoMap as PresnoMap;

  // we don't really need this, do we?
  const rootId: SynoId = ascendToRoot(
    renderEntrySynoId,
    renderEntryTree,
  ).id;

  return {
    rootId,
    presnos: immutablePresnoMap,
  };
};
