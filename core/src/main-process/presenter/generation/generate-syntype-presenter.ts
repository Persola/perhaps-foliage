import generateAttrPresenters from './generate-attr-presenters';
import Syno from '../../syntactic-interface/newnew/syno';

import type { SynoPresenter } from '../../../types/presenter/presenter';
import type { PresenterConfig } from '../../../types/language-integration/presenters/presenter-config';
import type { StateSelector } from '../../../types/state-selector';

export default (
  syntype: string,
  presenterConfig: PresenterConfig,
): SynoPresenter => {
  const [attrPresenters, childPresnoPresenters] = generateAttrPresenters(
    presenterConfig,
  );

  return (
    syno: Syno,
    state: StateSelector,
  ) => {
    const attrs = {};
    const childPresnoArgs = {};

    for (const [attrName, attrPresenter] of Object.entries(attrPresenters)) {
      attrs[attrName] = attrPresenter(syno, state);
    }

    for (const [childAttrName, childPresenter] of Object.entries(childPresnoPresenters)) {
      const childPresnoArg = childPresenter(syno, state);
      if (childPresnoArg !== null) {
        childPresnoArgs[childAttrName] = childPresnoArg;
      }
    }

    return [
      {
        syntype,
        ...attrs,
      },
      {
        ...childPresnoArgs,
      },
    ];
  };
};
