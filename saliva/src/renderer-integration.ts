import version from './version';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import actualGrammar from './actual-grammar.yml';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import syntypeSchema from './syntype-schema.yml';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import keyToNewSynoAttrs from './key-to-new-syno-attrs.yml';
import renderers from './renderers/renderers';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import styles from './stylesheet.lazy.css';

export default {
  version,
  actualGrammar,
  syntypeSchema,
  keyToNewSynoAttrs,
  renderers,
  styles,
};
