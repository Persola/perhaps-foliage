import { PresenterConfig } from '../../../types/language-integration/presenters/presenter-config';
import { Presenter } from '../../../types/presenter/presenter';

export default (
  presenterConfig: PresenterConfig,
): Presenter => {
  return (
    booleanLiteral: { value: string },
    // state selector uneeded
    // enstackForPresentation uneeded
  ) => {
    return {
      attrs: {
        value: booleanLiteral.value,
        syntype: 'booleanLiteral',
      },
      childPresnoArgs: {},
    };
  };
};
