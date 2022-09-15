import type { ActualGrammar } from '../../../grammar/actual-grammar';
import type { SyntacticTypeSchema } from '../../syntactic-type-schema/syntactic-type-schema';
import type { KeyToNewSynoAttrs } from '../../key-to-new-syno-attrs';
import type { Interpret } from '../../interpret';
import type { SynoValidators } from '../../syno-validators';
import type { Presenters } from '../../../presenter/presenters';
import type { SerializedSyno } from '../../../syntactic/serialized-syno';

export type MainsidePresentLangInt = {
  id: string;
  actualGrammar: ActualGrammar;
  syntacticTypeSchema: SyntacticTypeSchema;
  primitives: SerializedSyno | null;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  interpret: Interpret | null;
  synoValidators: SynoValidators;
  presenters: Presenters;
};
