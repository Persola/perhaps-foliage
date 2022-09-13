import type { ActualGrammar } from '../../../grammar/actual-grammar';
import type { SyntacticTypeSchema } from '../../../syntactic-type-schema/syntactic-type-schema';
import type { KeyToNewSynoAttrs } from '../../key-to-new-syno-attrs';
import type { Interpret } from '../../interpret';
import type { SynoValidators } from '../../syno-validators';
import type { PresenterProvisions } from '../../presenters/presenters-provisions';
import type { Renderers } from '../../../renderer/renderers';
import type { SerializedSyno } from '../../../syntactic/newnew/serialized-syno';

export type PresentLangInt = {
  id: string;
  actualGrammar: ActualGrammar;
  syntacticTypeSchema: SyntacticTypeSchema;
  primitives: SerializedSyno | null;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  interpret: Interpret | null;
  synoValidators: SynoValidators;
  presenters: PresenterProvisions;
  renderers: Renderers;
  styles: string;
};
