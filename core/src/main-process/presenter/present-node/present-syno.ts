import enstackChildPresnos from './enstack-child-presnos';
import focuses from './focuses';

import type { SynoId } from '../../../types/syntactic/syno-id';
import type { StateSelector } from '../../../types/state-selector';
import type { Focus } from '../../../types/editor-state/focus';
import type { MainsidePresentLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-present-lang-int';
import type { Presno } from '../../../types/presenter/presnos/presno';
import type { EnstackForPresentation } from '../../../types/presenter/enstack-for-presentation';

export default (
  synoId: SynoId,
  state: StateSelector,
  integration: MainsidePresentLangInt,
  focus: Focus,
  enstackForPresentation: EnstackForPresentation,
): Presno => {
  const syno = state.getSyno(synoId);

  const integrationPresenter = integration.presenters[syno.syntype];
  if (!(integrationPresenter instanceof Function)) {
    throw new Error(
      `Language integration missing presenter for syntype '${syno.syntype}'`,
    );
  }

  const validator = integration.synoValidators[syno.syntype];
  if (!(validator instanceof Function)) {
    throw new Error(
      `Language integration missing validator for syntype '${syno.syntype}'`,
    );
  }

  const [
    attrsFromIntegration,
    childPresnoArgsFromIntegration,
  ] = integrationPresenter(
    syno,
    state,
  );

  const childPresnoRefs = enstackChildPresnos(
    syno,
    integration,
    childPresnoArgsFromIntegration,
    enstackForPresentation,
  );

  const parent = (
    syno.parent === null
      ? null
      : {
        presnoRef: true,
        id: syno.parent.id,
      }
  );

  return {
    ...attrsFromIntegration,
    ...focuses(focus, syno.id),
    id: syno.id,
    prestype: syno.syntype,
    parent,
    children: childPresnoRefs,
    valid: validator(syno, state),
  };
};
