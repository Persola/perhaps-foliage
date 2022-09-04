import SyntaxTree from '../../../../main-process/syntactic-interface/newnew/syntax-tree';

import type { ActualGrammar } from '../../../grammar/actual-grammar';
import type { SyntypeSchema } from '../../../syntype-schema/syntype-schema';
import type { KeyToNewSynoAttrs } from '../../key-to-new-syno-attrs';
import type { Interpret } from '../../interpret';
import type { SynoValidators } from '../../syno-validators';
import type { PresenterProvisions } from '../../presenters/presenters-provisions';
import type { RendererConfig } from '../../renderers/renderer-config';

export type UninitializedPresentLangInt = {
  id: string;
  actualGrammar: ActualGrammar;
  syntypeSchema: SyntypeSchema;
  primitives: SyntaxTree | null;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  interpret: Interpret | null;
  synoValidators: SynoValidators;
  presenters: PresenterProvisions;
  renderers: Readonly<{
    [syntype: string]: RendererConfig;
  }>;
  styles: string;
};
