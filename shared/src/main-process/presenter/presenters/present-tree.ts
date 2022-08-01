import presentationNode from './create-presentation-node';
import createPresentAndReturnRef from './create-present-and-return-ref';
import presnoId from './presno-id';

import type { StateSelector } from '../../../types/state-selector';
import type { SynoId } from '../../../types/syntactic/syno-id';
import type { SynoMap } from '../../../types/syntactic/syno-map';
import type { Prestree } from '../../../types/presenter/prestree';
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map';
import type { PresnoMap } from '../../../types/presenter/presno-map';
import type { MainsidePresentLanguageIntegration } from '../../../types/language-integration/mainside-present-language-integration';
import type { Focus } from '../../../types/editor-state/focus';
import type { PresnoArgs } from '../../../types/presenter/presno-args';

export default (
  state: StateSelector,
  integration: MainsidePresentLanguageIntegration,
  renderEntrySynoId: SynoId,
  renderEntryTree: SynoMap,
  focus: Focus,
): Prestree => {
  const mutablePresnoMap: MutablePresnoMap = {};
  const rootPrensoArgs: PresnoArgs = {
    type: 'synPresno',
    synoId: renderEntrySynoId,
  };
  const toPresentStack: PresnoArgs[] = [rootPrensoArgs];
  const presentAndReturnRef = createPresentAndReturnRef(toPresentStack);

  while (toPresentStack.length > 0) {
    const args = toPresentStack.pop();
    const id = presnoId(args);

    if (typeof mutablePresnoMap[id] !== 'undefined') {
      throw new Error('attempted to overwrite presno!');
    }

    mutablePresnoMap[id] = presentationNode(
      args,
      state,
      integration,
      focus,
      presentAndReturnRef,
    );
  }

  const immutablePresnoMap = mutablePresnoMap as PresnoMap;

  return {
    rootId: renderEntrySynoId,
    presnos: immutablePresnoMap,
  };
};
