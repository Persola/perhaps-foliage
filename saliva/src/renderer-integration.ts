import version from './version';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import grammar from './grammar.yml';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import keyToNewSynoAttrs from './key-to-new-syno-attrs.yml';
import rendererAttrs from './renderers/renderer-attrs';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import styles from './stylesheet.lazy.css';

export default {
  version,
  grammar,
  keyToNewSynoAttrs,
  rendererAttrs,
  styles,
};
