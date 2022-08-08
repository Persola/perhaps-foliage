import type { PresnoMap } from './presno-map/presno-map';
import type { SynoId } from '../syntactic/syno-id';

export type Prestree = {
  readonly presnos: PresnoMap;
  readonly rootId: SynoId;
};
