import grammar from './grammar.yml';
import keyToNewSynoAttrs from './input-resolver/key-to-new-syno-attrs.yml';
import presenters from './presenters/presenters';
import createRenderers from './renderers/create-renderers';
import styles from './stylesheet.lazy.css';
import type { IntegrationDependencies } from '../../types/language-integration/integration-dependencies';
import type { PresentLanguageIntegration } from '../../types/language-integration/present-language-integration';

export default (
  integrationDependencies: IntegrationDependencies,
): PresentLanguageIntegration => {
  return {
    id: 'pantheon.0.0.1',
    grammar,
    primitives: null,
    keyToNewSynoAttrs,
    interpret: null,
    presenters,
    renderers: createRenderers(integrationDependencies),
    styles,
  };
};
