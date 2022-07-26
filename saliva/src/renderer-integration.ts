import version from './version';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import keyToNewSynoAttrs from './key-to-new-syno-attrs.yml';
import rendererCreators from './renderers/renderer-creators';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import styles from './stylesheet.lazy.css';

export default {
  version,
  keyToNewSynoAttrs,
  rendererCreators,
  styles,
};
