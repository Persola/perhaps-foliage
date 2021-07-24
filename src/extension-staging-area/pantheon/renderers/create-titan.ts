import type { PresentLanguageIntegration } from '../../../types/language-integration/present-language-integration';
import type { Presno } from '../../../types/presenter/presno';
import type { SynoId } from '../../../types/syno-id';
import type { SynoRendererProps } from '../../../types/renderer/syno-renderer-props';
import type { IntegrationDependencies } from '../../../types/language-integration/integration-dependencies';
import type { TitanPres } from '../types/presentations/titan';

type Props = {
  integration: PresentLanguageIntegration;
  getPresno: (arg0: SynoId) => Presno;
  // eslint-disable-line react/no-unused-prop-types
  presno: TitanPres;
  SynoRenderer: (props: SynoRendererProps) => any;
};
export default (integrationDependencies: IntegrationDependencies): any => {
  const {
    React,
    components: { NamePart },
  } = integrationDependencies;
  return (props: Props) => {
    const {
      integration,
      getPresno,
      SynoRenderer,
      presno: {
        name,
        focused,
        presnoFocused,
        charFocused,
        valid,
        child,
        synoId,
      },
    } = props;
    const classes = [
      'syno',
      'same-line',
      'bubble-even',
      'titan',
      focused ? 'focused' : 'unfocused',
      valid ? '' : 'invalid',
    ].join(' ');
    return React.createElement(
      'div',
      {
        className: classes,
        'data-syno-id': synoId,
      },
      name
        && React.createElement(NamePart, {
          namePart: name,
          focused: presnoFocused === 0,
          charFocused,
        }),
      child
        && React.createElement(SynoRenderer, {
          integration,
          getPresno,
          synoId: child.id,
          SynoRenderer,
        }),
    );
  };
};
