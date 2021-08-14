import type { IntegrationDependencies } from 'saliva-repl/dist/types/language-integration/integration-dependencies';
import type { PresentLanguageIntegration } from 'saliva-repl/dist/types/language-integration/present-language-integration';

// @ts-ignore how do I configure TS to ignore webpacked imports?
import grammar from './grammar.yml';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import keyToNewSynoAttrs from './input-resolver/key-to-new-syno-attrs.yml';
import presenters from './presenters/presenters';
import createRenderers from './renderers/create-renderers';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import styles from './stylesheet.lazy.css';

export default (
  integrationDependencies: IntegrationDependencies,
): PresentLanguageIntegration => {
  return {
    id: 'pantheon.0.0.1',
    grammar,
    primitives: {},
    keyToNewSynoAttrs,
    interpret: null,
    presenters,
    renderers: createRenderers(integrationDependencies),
    styles,
  };
};
