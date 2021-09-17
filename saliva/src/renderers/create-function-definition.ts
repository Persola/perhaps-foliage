import type { IntegrationDependencies } from 'saliva-repl/dist/types/language-integration/integration-dependencies';
import type { FunctionDefinitionRendererProps } from '../types/renderers/function-definition-props';

export default (
  integrationDependencies: IntegrationDependencies,
): (
  (props: FunctionDefinitionRendererProps) => JSX.Element
) => {
  const { React } = integrationDependencies;

  return (props: FunctionDefinitionRendererProps) => {
    const { integration, getPresno, presno, PresnoRenderer } = props;
    const { name, valid } = presno;
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
      presno.body && React.createElement(PresnoRenderer, {
        integration,
        getPresno,
        synoId: name.id,
        PresnoRenderer,
      }),
      parameters.map(paramRef => {
        return React.createElement(PresnoRenderer, {
          integration,
          key: paramRef.id,
          getPresno,
          synoId: paramRef.id,
          PresnoRenderer,
        });
      }),
      presno.body && React.createElement(PresnoRenderer, {
        integration,
        getPresno,
        synoId: presno.body.id,
        PresnoRenderer,
      }),
    );
  };
};
