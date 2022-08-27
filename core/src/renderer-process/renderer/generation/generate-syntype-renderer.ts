import * as React from 'react';

import generateChildComponentWrappers from './generate-child-component-wrappers';

import type { RendererConfig } from '../../../types/language-integration/renderers/renderer-config';
import type { Renderer } from '../../../types/renderer/renderer';
import type { SynPresnoRendererProps } from '../../../types/renderer/syn-presno-renderer-props';
import type { RendererComponent } from '../../../types/renderer/renderer-component';
import childPresnoComponent from './child-presno-component';

export default (
  attrs: RendererConfig,
): Renderer => {
  const {
    htmlClasses,
    content: childPresnosInstructions,
  } = attrs;

  const nonPresnoChildComponents: RendererComponent[] = generateChildComponentWrappers(
    childPresnosInstructions,
  );

  return (props: SynPresnoRendererProps) => {
    // TODO: check props (b/c they aren't typed anymore), ideally against provided presenter
    // TODO: check presno.syntype

    const {
      presno,
      presno: { id, valid, focused },
    } = props;

    const classes = htmlClasses.concat([
      'syno',
      focused ? 'focused' : 'unfocused',
      valid ? '' : 'invalid',
    ]);

    const nonPresnoChildren = nonPresnoChildComponents.map(comp => comp(props)).flat();
    const presnoChildren = presno.children.map(child => {
      return childPresnoComponent(props, child.childRef);
    });

    return React.createElement(
      'div',
      {
        className: classes.join(' '),
        'data-presno-id': id,
      },
      ...nonPresnoChildren,
      ...presnoChildren,
    );
  };
};
