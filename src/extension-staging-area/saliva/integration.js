import grammar from './grammar.yml';
import primitives from './primitives.yml';
import keyToNewSynoAttrs from './input-resolver/key-to-new-syno-attrs.yml';
import interpret from './interpreter/interpret';
import presenters from './presenters/presenters';
import renderers from './renderers/renderers';
import styles from './stylesheet.lazy.css';

export default {
  id: 'saliva.saliva-repl-alpha.0.0.1',
  grammar,
  primitives,
  keyToNewSynoAttrs,
  interpret,
  presenters,
  renderers,
  styles,
};
