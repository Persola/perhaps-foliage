import Syno from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/syno';

export default (
  funkshunDef: Syno,
): boolean => {
  return funkshunDef.children({ label: 'body' }).length === 1;
};
