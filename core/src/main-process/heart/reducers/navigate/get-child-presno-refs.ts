import createEnstackForPresentation from '../../../presenter/create-enstack-for-presentation';
import presentationNode from '../../../presenter/present-node/presentation-node';

import type { Syno } from '../../../../types/syntactic/syno';
import type { StateSelector } from '../../../../types/state-selector';
import type { MainsideLangInt } from '../../../../types/language-integration/interfaces/mainside/mainside-lang-int';
import type { PresnoRef } from '../../../../types/presenter/presno-ref';
import type { PresnoArgs } from '../../../../types/presenter/presno-args/presno-args';
import type { SynPresno } from '../../../../types/presenter/presnos/presno';

export default (
  syno: Syno,
  state: StateSelector,
  integration: MainsideLangInt,
): PresnoRef[] => {
  const stubEnstack = createEnstackForPresentation([], true);

  const synPresnoArgs: PresnoArgs = {
    type: 'synPresno',
    synoId: syno.id,
  };

  const presno = presentationNode(
    synPresnoArgs,
    state,
    integration,
    state.focus(),
    stubEnstack,
  ) as SynPresno;

  return presno.children.map(child => child.childRef);
};
