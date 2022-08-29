import enstackChildPresnos from './enstack-child-presnos';
import focuses from './focuses';

import type { SynPresnoArgs } from '../../../types/presenter/presno-args/syn-presno-args';
import type { StateSelector } from '../../../types/state-selector';
import type { Focus } from '../../../types/editor-state/focus';
import type { MainsidePresentLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-present-lang-int';
import type { SynPresno } from '../../../types/presenter/presnos/presno';
import type { EnstackForPresentation } from '../../../types/presenter/enstack-for-presentation';

export default (
  synPresnoArgs: SynPresnoArgs,
  state: StateSelector,
  integration: MainsidePresentLangInt,
  focus: Focus,
  enstackForPresentation: EnstackForPresentation,
): SynPresno => {
  const { synoId } = synPresnoArgs;
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
    focus,
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
    ...focuses(focus, synoId),
    id: synoId,
    prestype: syno.syntype,
    parent,
    children: childPresnoRefs,
    valid: validator(syno, state),
  };
};
