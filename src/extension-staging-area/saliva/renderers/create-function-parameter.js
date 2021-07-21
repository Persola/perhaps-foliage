// @flow
import type { IntegrationDependencies } from '../../../types/language-integration/integration-dependencies';
import type { FunctionParameterRendererProps } from '../types/renderers/function-parameter-props';

export default (integrationDependencies: IntegrationDependencies): any => {
  const { React, components: { NamePart } } = integrationDependencies;

  return (props: FunctionParameterRendererProps) => {
    const { presno } = props;
    const { presnoFocused, charFocused } = presno;
    const classes = [
      'syno',
      'same-line',
      'leaf',
      'bubble-even',
      'function-parameter',
      (presno.focused ? 'focused' : 'unfocused'),
    ].join(' ');

    return React.createElement(
      'div',
      {
        className: classes,
        'data-syno-id': presno.synoId,
      },
      React.createElement(
        NamePart,
        {
          namePart: presno.slot,
          focused: presnoFocused === 0,
          charFocused,
        },
      ),
    );
  };
};
