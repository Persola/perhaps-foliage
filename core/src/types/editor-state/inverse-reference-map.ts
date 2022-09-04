type ReadOnlySet<Member> = {
  // not included: add, clear, delete
  size: number;
  entries: () => Member[][];
  forEach: (callback: (member: Member) => void) => void;
  has: (query: unknown) => boolean;
  keys: () => Member[];
  values: () => Member[];
};

export type InverseReferenceMap = Record<
  number,
  ReadOnlySet<number>
>;
