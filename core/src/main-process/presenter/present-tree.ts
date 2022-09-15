import StateSelector from '../state-interface/state-selector';
import SyntaxTree from '../state-interface/syntactic-interface/readable/syntax-tree';

import presentationNode from './present-node/presentation-node';
import createEnstackForPresentation from './create-enstack-for-presentation';
import presnoId from './presno-id';

import type { Prestree } from '../../types/presenter/prestree';
import type { MutablePresnoMap } from '../../types/presenter/presno-map/mutable-presno-map';
import type { PresnoMap } from '../../types/presenter/presno-map/presno-map';
import type { MainsidePresentLangInt } from '../../types/language-integration/interfaces/mainside/mainside-present-lang-int';
import type { Focus } from '../../types/editor-state/focus';
import type { PresnoArgs } from '../../types/presenter/presno-args/presno-args';

export default (
  state: StateSelector,
  integration: MainsidePresentLangInt,
  tree: SyntaxTree,
  focus: Focus | null,
): Prestree => {
  const mutablePresnoMap: MutablePresnoMap = {};
  const rootPrensoArgs: PresnoArgs = {
    type: 'synPresno',
    synoId: tree.rootId(),
  };
  const toPresentStack: PresnoArgs[] = [rootPrensoArgs];
  const enstackForPresentation = createEnstackForPresentation(toPresentStack);

  while (toPresentStack.length > 0) {
    const args = toPresentStack.pop();
    const id: string = presnoId(args);

    if (typeof mutablePresnoMap[id] !== 'undefined') {
      throw new Error('attempted to overwrite presno!');
    }

    mutablePresnoMap[id] = presentationNode(
      args,
      state,
      tree,
      integration,
      focus,
      enstackForPresentation,
    );
  }

  return {
    rootId: presnoId(rootPrensoArgs),
    presnos: mutablePresnoMap as PresnoMap,
  };
};
