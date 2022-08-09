import createEnstackForPresentation from '../../../presenter/presenters/create-enstack-for-presentation';
import presentationNode from '../../../presenter/presenters/presentation-node';

import type { Syno } from '../../../../types/syntactic/syno';
import type { StateSelector } from '../../../../types/state-selector';
import type { MainsideLangInt } from '../../../../types/language-integration/interfaces/mainside/mainside-lang-int';
import type { PresnoRef } from '../../../../types/presenter/presno-ref';
import type { PresnoArgs } from '../../../../types/presenter/presno-args';

export default (
  syno: Syno,
  state: StateSelector,
  integration: MainsideLangInt,
): PresnoRef[] => {
  const stubEnstack = createEnstackForPresentation([], true);

  const synoPrensoArgs: PresnoArgs = {
    type: 'synPresno',
    synoId: syno.id,
  };

  const presno = presentationNode(
    synoPrensoArgs,
    state,
    integration,
    state.focus(),
    stubEnstack,
  );

  const childPresnoRefs = [];

  for (const [attrKey, attrVal] of Object.entries(presno)) {
    if (
      typeof attrVal === 'object'
      && attrVal !== null
      && 'presnoRef' in attrVal
      && attrVal.presnoRef === true
      && attrKey !== 'parent'
    ) {
      childPresnoRefs.push(attrVal);
    } else if (
      typeof attrVal === 'object'
      && attrVal !== null
      && attrVal.constructor === Array
    ) {
      childPresnoRefs.push(...attrVal);
    }
  }

  return childPresnoRefs;
};
