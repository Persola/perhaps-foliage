import type { ActualGrammar } from '../../../grammar/actual-grammar';
import type { SyntypeSchema } from '../../../syntype-schema/syntype-schema';
import type { SynoMap } from '../../../syntactic/syno-map';
import type { KeyToNewSynoAttrs } from '../../key-to-new-syno-attrs';
import type { Interpret } from '../../interpret';
import type { SynoValidators } from '../../syno-validators';
import type { PresenterProvisions } from '../../presenters/presenters-provisions';

export type MainsideUninitializedPresentLangInt = {
  id: string;
  actualGrammar: ActualGrammar;
  syntypeSchema: SyntypeSchema;
  primitives: SynoMap | null;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  interpret: Interpret | null;
  synoValidators: SynoValidators;
  presenters: PresenterProvisions;
};
