import type { SynoId } from '../syntactic/syno-id';

type ReadOnlySet<Member> = {
  size: number;
  // add:
  // clear:
  // delete:
  entries: () => Member[][];
  forEach: (callback: (member: Member) => void) => void;
  has: (query: unknown) => boolean;
  keys: () => Member[];
  values: () => Member[];
};

export type InverseReferenceMap = Record<
  SynoId,
  ReadOnlySet<SynoId>
>;
