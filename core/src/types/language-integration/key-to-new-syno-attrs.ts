import { SerializedSyno } from '../syntactic/serialized-syno';

export type KeyToNewSynoAttrs = Readonly<{
  [input: string]: SerializedSyno;
}>;
