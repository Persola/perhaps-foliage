// @flow
import type { SynoId } from './syno-id'

export type InverseReferenceMap = { [SynoId]: Set<SynoId> }
