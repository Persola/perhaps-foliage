import version from './version';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import actualGrammar from './actual-grammar.yml';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import syntypeSchema from './syntype-schema.yml';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import primitives from './primitives.yml';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import keyToNewSynoAttrs from './key-to-new-syno-attrs.yml';
import interpret from './interpreter/interpret';
import synoValidators from './syno-validators/syno-validators';
import presenters from './presenters/presenters';
import renderers from './renderers/renderers';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import styles from './stylesheet.lazy.css';

export default {
  id: `saliva.perhaps-foliage-alpha.${version}`,
  actualGrammar,
  syntypeSchema,
  primitives,
  keyToNewSynoAttrs,
  interpret,
  synoValidators,
  presenters,
  renderers,
  styles,
};
