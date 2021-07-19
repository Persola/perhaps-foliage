import grammar from './grammar.yml';
import keyToNewSynoAttrs from './input-resolver/key-to-new-syno-attrs.yml';
import presenters from './presenters/presenters';
import renderers from './renderers/renderers';
import styles from './stylesheet.lazy.css';

export default {
  id: 'pantheon.0.0.1',
  grammar,
  primitives: false,
  keyToNewSynoAttrs,
  interpret: false,
  presenters,
  renderers,
  styles,
};
