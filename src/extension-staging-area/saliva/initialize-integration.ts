import grammar from './grammar.yml';
import primitives from './primitives.yml';
import keyToNewSynoAttrs from './input-resolver/key-to-new-syno-attrs.yml';
import interpret from './interpreter/interpret';
import presenters from './presenters/presenters';
import createRenderers from './renderers/create-renderers';
import styles from './stylesheet.lazy.css';

import type { IntegrationDependencies } from '../../types/language-integration/integration-dependencies';
import type { PresentLanguageIntegration } from '../../types/language-integration/present-language-integration';

export default (
  integrationDependencies: IntegrationDependencies,
): PresentLanguageIntegration => {
  return {
    id: 'saliva.saliva-repl-alpha.0.0.1',
    grammar,
    primitives,
    keyToNewSynoAttrs,
    interpret,
    presenters,
    renderers: createRenderers(integrationDependencies),
    styles,
  };
};
