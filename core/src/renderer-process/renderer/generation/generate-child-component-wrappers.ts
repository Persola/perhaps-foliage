import * as React from 'react';
import Text from '../components/vis/text';
import completeInstruction from './complete-instruction';

import type { childPresnoInstruction } from '../../../types/language-integration/renderers/child-presno-instruction';
import type { childPresnoFullInstruction } from '../../../types/language-integration/renderers/child-presno-full-instruction';
import type { SynPresnoRendererProps } from '../../../types/renderer/syn-presno-renderer-props';
import type { RendererComponent } from '../../../types/renderer/renderer-component';

const nonPresnoGenerator = (
  instruction: childPresnoFullInstruction,
): RendererComponent => {
  return (parentProps: SynPresnoRendererProps) => {
    const { presno } = parentProps;
    const textVal = presno[instruction.attr];

    if (textVal === null) {
      return null;
    }

    return React.createElement(
      Text,
      { text: String(textVal) },
    );
  };
};

export default (
  instructions: childPresnoInstruction[],
): RendererComponent[] => {
  return instructions.map(instruction => {
    return nonPresnoGenerator(completeInstruction(instruction));
  });
};
