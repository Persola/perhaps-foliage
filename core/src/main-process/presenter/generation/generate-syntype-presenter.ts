import type { GrammarSyntypeEntry } from '../../../types/grammar/syntype';
import type { Presenter } from '../../../types/presenter/presenter';
import type { PresenterConfig } from '../../../types/language-integration/presenters/presenter-config';
import { Syno } from '../../../types/syntactic/syno';
import { StateSelector } from '../../../types/state-selector';
import { SynPresnoArgs } from '../../../types/presenter/presno-args/syn-presno-args';
import generateAttrPresenters from './generate-attr-presenters';

export default (
  syntype: string,
  presenterConfig: PresenterConfig,
  syntypeGrammarEntry: GrammarSyntypeEntry,
): Presenter => {
  const [attrPresenters, childPresnoPresenters] = generateAttrPresenters(
    presenterConfig,
    syntypeGrammarEntry,
  );

  return (
    syno: Syno,
    state: StateSelector,
    childSynPresnoArgs: { [childSynPresnoArgsKey: string]: SynPresnoArgs },
  ) => {
    const attrs = {};
    const childPresnoArgs = {};

    for (const [attrName, attrPresenter] of Object.entries(attrPresenters)) {
      attrs[attrName] = attrPresenter(syno, state);
    }

    for (const [childAttrName, childPresenter] of Object.entries(childPresnoPresenters)) {
      childPresnoArgs[childAttrName] = childPresenter(syno, state);
    }

    return {
      attrs: {
        syntype,
        ...attrs,
      },
      childPresnoArgs: {
        ...childPresnoArgs,
      },
    };
  };
};
