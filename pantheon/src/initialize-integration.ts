// @ts-ignore how do I configure TS to ignore webpacked imports?
import actualGrammar from './actual-grammar.yml';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import syntypeSchema from './syntype-schema.yml';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import keyToNewSynoAttrs from './key-to-new-syno-attrs.yml';
import synoValidators from './syno-validators/syno-validators';
import presenters from './presenters/presenters';
import renderers from './renderers/renderers';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import styles from './stylesheet.lazy.css';

export default {
  id: 'pantheon.0.0.14',
  actualGrammar,
  syntypeSchema,
  primitives: {},
  keyToNewSynoAttrs,
  interpret: null,
  synoValidators,
  presenters,
  renderers,
  styles,
};
