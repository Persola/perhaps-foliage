import type { ActualGrammar } from '../../../grammar/actual-grammar';
import type { SyntypeSchema } from '../../../syntype-schema/syntype-schema';
import type { KeyToNewSynoAttrs } from '../../key-to-new-syno-attrs';
import type { Interpret } from '../../interpret';
import type { SynoValidators } from '../../syno-validators';
import type { PresenterProvisions } from '../../presenters/presenters-provisions';
import type { RendererConfig } from '../../renderers/renderer-config';
import type { SerializedSyno } from '../../../syntactic/newnew/serialized-syno';

export type UninitializedPresentLangInt = {
  id: string;
  actualGrammar: ActualGrammar;
  syntypeSchema: SyntypeSchema;
  primitives: SerializedSyno | null;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  interpret: Interpret | null;
  synoValidators: SynoValidators;
  presenters: PresenterProvisions;
  renderers: Readonly<{
    [syntype: string]: RendererConfig;
  }>;
  styles: string;
};
