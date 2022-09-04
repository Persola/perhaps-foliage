type treeNavigationStep = (
  | number // child index
  | '..' // parent
);

export type AbsoluteSynoUri = {
  type: 'absolute',
  treeHost: string[];
  path: treeNavigationStep[];
};

export type RelativeSynoUri = {
  type: 'relative',
  path: treeNavigationStep[];
};

export type SynoUri = AbsoluteSynoUri | RelativeSynoUri;
