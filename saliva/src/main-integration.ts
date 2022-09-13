import version from './version';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import actualGrammar from './actual-grammar.yml';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import syntacticTypeSchema from './syntactic-type-schema.yml';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import primitives from './primitives.yml';
// @ts-ignore how do I configure TS to ignore webpacked imports?
import keyToNewSynoAttrs from './key-to-new-syno-attrs.yml';
import interpret from './interpreter/interpret';
import synoValidators from './syno-validators/syno-validators';
import presenters from './presenters/presenters';

export default {
  id: `saliva.${version}`,
  actualGrammar,
  syntacticTypeSchema,
  primitives,
  keyToNewSynoAttrs,
  interpret,
  synoValidators,
  presenters,
};
