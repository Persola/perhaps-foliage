// @flow
import type { SynoId } from '../../syno-id';

export type MutableInverseReferenceMap = { [SynoId]: Set<SynoId> }
