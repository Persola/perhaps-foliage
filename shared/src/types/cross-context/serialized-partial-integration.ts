import type { Grammar } from '../grammar/grammar';
import type { SynoMap } from '../syntactic/syno-map';
import type { KeyToNewSynoAttrs } from '../language-integration/key-to-new-syno-attrs';

export type SerializedPartialIntegration = {
  id: string | null;
  grammar: Grammar | null;
  primitives: SynoMap | null,
  keyToNewSynoAttrs: KeyToNewSynoAttrs | null,
  styles: string,
};
