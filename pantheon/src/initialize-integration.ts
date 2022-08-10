// @ts-ignore how do I configure TS to ignore webpacked imports?
import grammar from './grammar.yml';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import keyToNewSynoAttrs from './key-to-new-syno-attrs.yml';
import synoValidators from './syno-validators/syno-validators';
import presenters from './presenters/presenters';
import renderers from './renderers/renderers';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import styles from './stylesheet.lazy.css';

export default {
  id: 'pantheon.0.0.1',
  grammar,
  primitives: {},
  keyToNewSynoAttrs,
  interpret: null,
  synoValidators,
  presenters,
  renderers,
  styles,
};
