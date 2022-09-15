import { SerializedSyno } from '../../syntactic/serialized-syno';

export type ReplaceFocusedSyno = {
  readonly type: 'REPLACE_FOCUSED_SYNO';
  readonly newSynoAttrs: SerializedSyno;
};
