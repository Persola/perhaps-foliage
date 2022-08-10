import type { Grammar } from '../../../grammar/grammar';
import type { SynoMap } from '../../../syntactic/syno-map';
import type { KeyToNewSynoAttrs } from '../../key-to-new-syno-attrs';
import type { Interpret } from '../../interpret';
import type { SynoValidators } from '../../syno-validators';
import type { PresenterProvisions } from '../../presenters/presenters-provisions';
import type { Renderers } from '../../../renderer/renderers';

export type PresentLangInt = {
  id: string;
  grammar: Grammar;
  primitives: SynoMap | null;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  interpret: Interpret | null;
  synoValidators: SynoValidators;
  presenters: PresenterProvisions;
  renderers: Renderers;
  styles: string;
};
