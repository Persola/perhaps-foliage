import version from './version';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import grammar from './grammar.yml';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import primitives from './primitives.yml';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import keyToNewSynoAttrs from './input-resolver/key-to-new-syno-attrs.yml';
import interpret from './interpreter/interpret';
import presenters from './presenters/presenters';

export default {
  id: `saliva.saliva-repl-alpha.${version}`,
  grammar,
  primitives,
  keyToNewSynoAttrs,
  interpret,
  presenters,
};
