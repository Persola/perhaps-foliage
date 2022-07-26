import * as React from 'react';
import Text from './components/vis/text';

import type { Presno } from '../../types/presenter/presno';
import type { RendererAttrs } from '../../types/language-integration/renderer-attrs';
import type { Renderer } from '../../types/language-integration/renderer';
import type { childPresnoInstruction } from '../../types/language-integration/child-presno-instruction';
import type { childPresnoFullInstruction } from '../../types/language-integration/child-presno-full-instruction';
import type { SharedRendererProps } from '../../types/renderer/shared-renderer-props';

const childPresnoComponentsFromInstruction = (
  presno: Presno,
  instruction: childPresnoInstruction,
  renderChildPresnos,
) => {
  let fullInstruction: childPresnoFullInstruction;

  if (typeof instruction === 'object') {
    fullInstruction = instruction;
  } else if (typeof instruction === 'string') {
    if (typeof presno[instruction] === 'string') {
      fullInstruction = {
        attr: instruction,
        as: 'string',
      };
    } else if (typeof presno[instruction] === 'object') {
      fullInstruction = {
        attr: instruction,
        as: 'string',
      };
    }
  } else {
    throw new TypeError('Received child presno renderering instruction of unrecognized form');
  }

  if (presno.prestype === 'booleanLiteral') {
    return [
      React.createElement(
        Text,
        { text: String(presno[fullInstruction.attr]) },
      ),
    ];
  }

  return renderChildPresnos(fullInstruction.attr);
};

const childPresnoComponentsFromInstructions = (
  presno: Presno,
  instructions: childPresnoInstruction[],
  renderChildPresnos,
) => {
  const components = [];

  for (const instruction of instructions) {
    components.push(
      ...childPresnoComponentsFromInstruction(presno, instruction, renderChildPresnos),
    );
  }

  return components;
};

export default (attrs: RendererAttrs): Renderer => {
  const {
    classes: syntypeClasses,
    childPresnos: childPresnosInstructions,
  } = attrs;

  return (props: SharedRendererProps) => {
    // check props (b/c they aren't typed anymore), ideally against presenter

    const {
      presno,
      presno: { focused, valid, synoId },
    } = props;

    // check presno.syntype

    const classes = syntypeClasses.concat([
      'syno',
      focused ? 'focused' : 'unfocused',
      valid ? '' : 'invalid',
    ]);

    const renderChildPresnos = (childAttr: string): React.ReactElement[] => {
      const val = presno[childAttr];

      if (val === null) {
        return [null];
      }

      if (val instanceof Array) {
        return val.map(childRef => {
          return React.createElement(props.PresnoRenderer, {
            integration: props.integration,
            getPresno: props.getPresno,
            synoId: childRef.id,
            PresnoRenderer: props.PresnoRenderer,
            key: childRef.id,
          });
        });
      }

      return [
        React.createElement(props.PresnoRenderer, {
          integration: props.integration,
          getPresno: props.getPresno,
          // @ts-ignore
          synoId: val.id,
          PresnoRenderer: props.PresnoRenderer,
          // @ts-ignore
          key: val.id,
        }),
      ];
    };

    const childPresnoComponents = childPresnoComponentsFromInstructions(
      presno,
      childPresnosInstructions,
      renderChildPresnos,
    );

    return React.createElement(
      'div',
      {
        className: classes.join(' '),
        'data-syno-id': synoId,
      },
      ...childPresnoComponents,
    );
  };
};
