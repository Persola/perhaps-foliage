export type InverseEdgeMapEntry = {
  // this is just used as a set; use the keys, ignore the values
  [refererId: string]: true
};

export type InverseEdgeMap = {
  [referentId: string]: InverseEdgeMapEntry;
};
