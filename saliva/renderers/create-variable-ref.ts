import type { IntegrationDependencies } from '../../src/types/language-integration/integration-dependencies';
import type { VariableRefRendererProps } from '../types/renderers/variable-ref-props';

export default (
  integrationDependencies: IntegrationDependencies,
): (
  (props: VariableRefRendererProps) => JSX.Element
) => {
  const {
    React,
    components: { NamePart },
  } = integrationDependencies;
  return (props: VariableRefRendererProps) => {
    const { presno } = props;
    const { presnoFocused, charFocused } = presno;
    const classes = [
      'syno',
      'same-line',
      'leaf',
      'bubble-even',
      'variable-ref',
      presno.focused ? 'focused' : 'unfocused',
    ].join(' ');

    return React.createElement(
      'div',
      {
        className: classes,
        'data-syno-id': presno.synoId,
      },
      presno.name && React.createElement(NamePart, {
        namePart: presno.name,
        focused: presnoFocused === 0,
        charFocused,
      }),
    );
  };
};
