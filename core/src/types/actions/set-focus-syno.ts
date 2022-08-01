import type { SynoId } from '../syntactic/syno-id';

export type SetFocusSyno = {
  readonly type: 'SET_FOCUS_SYNO';
  readonly synoId: SynoId;
};
