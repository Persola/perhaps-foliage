import type { IntegrationDependencies } from '../../../types/language-integration/integration-dependencies';
import type { FunctionDefinitionRendererProps } from '../types/renderers/function-definition-props';

export default (
  integrationDependencies: IntegrationDependencies,
): (
  (props: FunctionDefinitionRendererProps) => JSX.Element
) => {
  const {
    React,
    components: { NamePart },
  } = integrationDependencies;
  return (props: FunctionDefinitionRendererProps) => {
    const { integration, getPresno, presno, SynoRenderer } = props;
    const { name, presnoFocused, charFocused, valid } = presno;
    const { parameters } = presno;
    const classes = [
      'syno',
      'function-definition',
      presno.focused ? 'focused' : 'unfocused',
      valid ? '' : 'invalid',
    ].join(' ');

    return React.createElement(
      'div',
      {
        className: classes,
        'data-syno-id': presno.synoId,
      },
      React.createElement(NamePart, {
        namePart: name,
        focused: presnoFocused === 0,
        charFocused,
      }),
      parameters.map(paramRef => {
        return React.createElement(SynoRenderer, {
          integration,
          key: paramRef.id,
          getPresno,
          synoId: paramRef.id,
          SynoRenderer,
        });
      }),
      presno.body && React.createElement(SynoRenderer, {
        integration,
        getPresno,
        synoId: presno.body.id,
        SynoRenderer,
      }),
    );
  };
};
