import * as React from 'react';

import generateChildComponentWrappers from './generate-child-component-wrappers';

import type { RendererConfig } from '../../../types/language-integration/renderers/renderer-config';
import type { Renderer } from '../../../types/renderer/renderer';
import type { SharedRendererProps } from '../../../types/renderer/shared-renderer-props';
import type { GrammarSyntypeEntry } from '../../../types/grammar/syntype';
import type { ComponentOrVectorComponent } from '../../../types/renderer/component-or-vector-component';

export default (
  attrs: RendererConfig,
  syntypeGrammarEntry: GrammarSyntypeEntry,
): Renderer => {
  const {
    htmlClasses,
    content: childPresnosInstructions,
  } = attrs;

  const childComponentWrappers: ComponentOrVectorComponent[] = generateChildComponentWrappers(
    childPresnosInstructions,
    syntypeGrammarEntry,
  );

  return (props: SharedRendererProps) => {
    // TODO: check props (b/c they aren't typed anymore), ideally against provided presenter
    // TODO: check presno.syntype

    const {
      presno: { focused, valid, id },
    } = props;

    const classes = htmlClasses.concat([
      'syno',
      focused ? 'focused' : 'unfocused',
      valid ? '' : 'invalid',
    ]);

    const childComponents = childComponentWrappers.map(gen => gen(props)).flat();

    return React.createElement(
      'div',
      {
        className: classes.join(' '),
        'data-presno-id': id,
      },
      ...childComponents,
    );
  };
};
