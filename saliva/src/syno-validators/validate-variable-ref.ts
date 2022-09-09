import Syno from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syno';

export default (
  variableRef: Syno,
): boolean => {
  return !!(variableRef.hasRef('referent'));
};
