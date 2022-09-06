export type TreeNavigationStep = (
  | number // child index
  | '..' // parent
);

export type AbsoluteSynoUri = {
  type: 'absolute',
  treeHost: string[];
  path: number[];
};

export type RelativeSynoUri = {
  type: 'relative',
  path: TreeNavigationStep[];
};

export type SynoUri = AbsoluteSynoUri | RelativeSynoUri;
