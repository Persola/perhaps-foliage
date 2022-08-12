import presentationNode from './present-node/presentation-node';
import createEnstackForPresentation from './create-enstack-for-presentation';
import presnoId from './presno-id';

import type { StateSelector } from '../../types/state-selector';
import type { SynoId } from '../../types/syntactic/syno-id';
import type { Prestree } from '../../types/presenter/prestree';
import type { MutablePresnoMap } from '../../types/presenter/presno-map/mutable-presno-map';
import type { PresnoMap } from '../../types/presenter/presno-map/presno-map';
import type { MainsidePresentLangInt } from '../../types/language-integration/interfaces/mainside/mainside-present-lang-int';
import type { Focus } from '../../types/editor-state/focus';
import type { PresnoArgs } from '../../types/presenter/presno-args/presno-args';

export default (
  state: StateSelector,
  integration: MainsidePresentLangInt,
  renderEntrySynoId: SynoId,
  focus: Focus,
): Prestree => {
  const mutablePresnoMap: MutablePresnoMap = {};
  const rootPrensoArgs: PresnoArgs = {
    type: 'synPresno',
    synoId: renderEntrySynoId,
  };
  const toPresentStack: PresnoArgs[] = [rootPrensoArgs];
  const enstackForPresentation = createEnstackForPresentation(toPresentStack);

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
      enstackForPresentation,
    );
  }

  const immutablePresnoMap = mutablePresnoMap as PresnoMap;

  return {
    rootId: renderEntrySynoId,
    presnos: immutablePresnoMap,
  };
};
