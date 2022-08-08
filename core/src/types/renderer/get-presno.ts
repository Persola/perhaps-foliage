import type { SynoId } from '../syntactic/syno-id';
import type { Presno } from '../presenter/presnos/presno';

export type GetPresno = (synoId: SynoId) => Presno;
