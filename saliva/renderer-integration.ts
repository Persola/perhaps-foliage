import version from './version';
import keyToNewSynoAttrs from './input-resolver/key-to-new-syno-attrs.yml';
import createRenderers from './renderers/create-renderers';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import styles from './stylesheet.lazy.css';

export default {
  version,
  keyToNewSynoAttrs,
  createRenderers,
  styles,
};
