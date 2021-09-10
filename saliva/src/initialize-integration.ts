import type { IntegrationDependencies } from 'saliva-repl/dist/types/language-integration/integration-dependencies';
import type { PresentLanguageIntegration } from 'saliva-repl/dist/types/language-integration/present-language-integration';

import version from './version';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import grammar from './grammar.yml';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import primitives from './primitives.yml';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import keyToNewSynoAttrs from './key-to-new-syno-attrs.yml';
import interpret from './interpreter/interpret';
import synoValidators from './syno-validators/syno-validators';
import presenters from './presenters/presenters';
import createRenderers from './renderers/create-renderers';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import styles from './stylesheet.lazy.css';

export default (
  integrationDependencies: IntegrationDependencies,
): PresentLanguageIntegration => {
  return {
    id: `saliva.saliva-repl-alpha.${version}`,
    grammar,
    primitives,
    keyToNewSynoAttrs,
    interpret,
    synoValidators,
    presenters,
    renderers: createRenderers(integrationDependencies),
    styles,
  };
};
