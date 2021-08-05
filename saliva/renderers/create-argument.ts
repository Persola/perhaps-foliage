import type { IntegrationDependencies } from '../../src/types/language-integration/integration-dependencies';
import type { ArgumentRendererProps } from '../types/renderers/argument-props';

export default (
  integrationDependencies: IntegrationDependencies,
): (
  (props: ArgumentRendererProps) => JSX.Element
) => {
  const {
    React,
    components: { NamePart },
  } = integrationDependencies;
  return (props: ArgumentRendererProps) => {
    const {
      integration,
      getPresno,
      SynoRenderer,
      presno: {
        focused,
        synoId,
        name,
        value,
        presnoFocused,
        charFocused,
        valid,
      },
    } = props;
    const classes = [
      'syno',
      'same-line',
      'bubble-even',
      'argument',
      focused ? 'focused' : 'unfocused',
      valid ? '' : 'invalid',
    ].join(' ');

    return React.createElement(
      'div',
      {
        className: classes,
        'data-syno-id': synoId,
      },
      name && React.createElement(NamePart, {
        namePart: name,
        focused: presnoFocused === 0,
        charFocused,
      }),
      value && React.createElement(SynoRenderer, {
        integration,
        getPresno,
        synoId: value.id,
        SynoRenderer,
      }),
    );
  };
};
