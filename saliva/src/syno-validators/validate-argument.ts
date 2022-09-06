import Syno from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/syno';

export default (
  argument: Syno,
): boolean => {
  return !!(
    argument.hasRef('parameter')
    && argument.children({ label: 'value' }).length === 1
  );
};
