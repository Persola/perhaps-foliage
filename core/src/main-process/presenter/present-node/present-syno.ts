import focuses from './focuses';
import presnoArgsForChildSynos from './presno-args-for-child-synos';

import type { SynoId } from '../../../types/syntactic/syno-id';
import type { StateSelector } from '../../../types/state-selector';
import type { Focus } from '../../../types/editor-state/focus';
import type { MainsidePresentLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-present-lang-int';
import type { Presno } from '../../../types/presenter/presnos/presno';
import type { EnstackForPresentation } from '../../../types/presenter/enstack-for-presentation';
import { PresnoRef } from '../../../types/presenter/presno-ref';
import { Presenter } from '../../../types/presenter/presenter';

const indexPresnoChildren = (
  childPresnoArgs: ReturnType<Presenter>['childPresnoArgs'],
  enstackForPresentation: EnstackForPresentation,
): { [childPresnoAttrName: string]: (PresnoRef | PresnoRef[])} => { // eslint-disable-line
  const childPresnoRefs: Record<string, (PresnoRef | PresnoRef[])> = {};
  let ind = 0;
  Object.entries(childPresnoArgs).forEach(entry => {
    const [key, val] = entry;
    if (val.constructor !== Array) {
      // @ts-ignore
      childPresnoRefs[key] = enstackForPresentation(ind, val);
      ind += 1;
    } else {
      childPresnoRefs[key] = [];
      for (const args of val) {
        // @ts-ignore
        childPresnoRefs[key].push(enstackForPresentation(ind, args));
        ind += 1;
      }
    }
  });

  return childPresnoRefs;
};

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

  const childSynPresnoArgs = presnoArgsForChildSynos(syno, integration);

  const integrationPresentation = integrationPresenter(
    syno,
    state,
    childSynPresnoArgs,
    enstackForPresentation,
  );

  const childPresnoRefs = indexPresnoChildren(
    integrationPresentation.childPresnoArgs,
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
    ...integrationPresentation.attrs,
    ...childPresnoRefs,
    ...focuses(focus, syno.id),
    id: syno.id,
    parent,
    prestype: syno.syntype,
    valid: validator(syno, state),
  };
};
