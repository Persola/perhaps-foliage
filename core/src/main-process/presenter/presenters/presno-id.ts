import type { PresnoArgs } from '../../../types/presenter/presno-args';

export default (presnoArgs: PresnoArgs): string => {
  if (presnoArgs.type === 'synPresno') {
    return presnoArgs.synoId;
  }

  if (presnoArgs.type === 'nonSynPresno') {
    return `${presnoArgs.parentId}-${presnoArgs.presnoArgs.prestype}`; // TODO: uniquify
  }

  throw new Error('Bad presno args');
};
