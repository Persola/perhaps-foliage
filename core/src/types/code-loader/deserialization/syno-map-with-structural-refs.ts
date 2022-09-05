import type { RawSynoWithStructuralRefs } from './raw-syno-with-structural-refs';

export type SynoMapWithStructuralRefs = {
  [synoId: string]: RawSynoWithStructuralRefs;
};
