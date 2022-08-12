import { completeAttrInstruction, completeChildInstruction } from './complete-instruction';

import type { GrammarSyntypeEntry } from '../../../../types/grammar/syntype';
import type { PresenterConfig } from '../../../../types/language-integration/presenters/presenter-config';
import { PresnoChildAttrVal, PresnoNonChildAttrVal } from '../../../../types/presenter/presnos/presno-attrs';
import { PresnoNonChildAttrFullInstruction } from '../../../../types/language-integration/presenters/presno-non-child-attr-full-instruction';
import { Syno } from '../../../../types/syntactic/syno';
import { PresnoChildAttrFullInstruction } from '../../../../types/language-integration/presenters/presno-child-attr-full-instruction';
import { StateSelector } from '../../../../types/state-selector';

const attrPresenter = (
  attrInstruction: PresnoNonChildAttrFullInstruction,
) => { // eslint-disable-line
  return (
    syno: Syno,
    // state: StateSelector,
  ): PresnoNonChildAttrVal => {
    if (typeof syno[attrInstruction.from] !== 'boolean') {
      throw new Error(
        `presenter config told me to copy syno's (${syno.id}) attr '${attrInstruction.from}'`
        + ' but it was not a boolean',
      );
    }

    return syno[attrInstruction.from] as boolean;
  };
};

const childAttrPresenter = (
  attrInstruction: PresnoChildAttrFullInstruction,
) => { // eslint-disable-line
  return (
    syno: Syno,
    state: StateSelector,
  ): PresnoChildAttrVal => {
    return {
      presnoRef: true,
      id: '1',
    };
  };
};

type AttrPresenters = [
  {
    [a: string]: (syno: Syno, state: StateSelector) => PresnoNonChildAttrVal,
  },
  {
    [b: string]: (syno: Syno, state: StateSelector) => PresnoChildAttrVal,
  }
];

export default (
  instructions: PresenterConfig,
  syntypeGrammarEntry: GrammarSyntypeEntry,
): AttrPresenters => {
  const attrPresenters = {};
  const childAttrPresenters = {};

  for (const [
    attrName,
    attrInstruction,
  ] of Object.entries(instructions.attrs)) {
    const fullInstruction = completeAttrInstruction(attrInstruction);
    attrPresenters[attrName] = attrPresenter(fullInstruction);
  }

  for (const [
    childAttrName,
    childAttrInstruction,
  ] of Object.entries(instructions.childPresnoArgs)) {
    const fullInstruction = completeChildInstruction(childAttrInstruction);
    attrPresenters[childAttrName] = childAttrPresenter(fullInstruction);
  }

  return [
    attrPresenters,
    childAttrPresenters,
  ];
};
