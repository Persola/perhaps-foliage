import { completeAttrInstruction, completeChildInstruction } from './complete-instruction';
import namePart from './child-attr-presenters/name-part';
import copy from './non-child-attr-presenters/copy';
import readRefAttr from './non-child-attr-presenters/read-ref-attr';

import type { PresenterConfig } from '../../../types/language-integration/presenters/presenter-config';
import type { PresnoNonChildAttrFullInstruction } from '../../../types/language-integration/presenters/instructions/presno-non-child-attr-full-instruction';
import type { AttrPresenters, ChildAttrPresenter, NonChildAttrPresenter } from '../../../types/language-integration/presenters/attr-presenters';
import type { PresnoChildAttrFullInstruction } from '../../../types/language-integration/presenters/instructions/presno-child-attr-full-instruction';

const nonChildAttrPresenter = (
  attrInstruction: PresnoNonChildAttrFullInstruction,
): NonChildAttrPresenter => { // eslint-disable-line
  if (attrInstruction.from === 'attr') {
    return copy(attrInstruction);
  }

  if (attrInstruction.from === 'refAttr') {
    return readRefAttr(attrInstruction);
  }

  throw new TypeError('unrecognized presno attr instruction');
};

const childAttrPresenter = (
  instruction: PresnoChildAttrFullInstruction,
): ChildAttrPresenter => { // eslint-disable-line
  if (instruction.from === 'attr') {
    return namePart(instruction);
  }

  throw new TypeError('unrecognized presno child attr instruction');
};

export default (
  instructions: PresenterConfig,
): AttrPresenters => {
  const attrPresenters = {};
  const childAttrPresenters = {};

  for (const [
    attrName,
    attrInstruction,
  ] of Object.entries(instructions.attrs)) {
    const fullInstruction = completeAttrInstruction(attrInstruction);
    attrPresenters[attrName] = nonChildAttrPresenter(fullInstruction);
  }

  for (const [
    childAttrName,
    childAttrInstruction,
  ] of Object.entries(instructions.childPresnoArgs)) {
    const fullInstruction = completeChildInstruction(childAttrInstruction);
    childAttrPresenters[childAttrName] = childAttrPresenter(fullInstruction);
  }

  return [
    attrPresenters,
    childAttrPresenters,
  ];
};
