import type { SynoId } from '../../syntactic/syno-id';

export type MutableInverseReferenceMap = Record<SynoId, Set<SynoId>>;
