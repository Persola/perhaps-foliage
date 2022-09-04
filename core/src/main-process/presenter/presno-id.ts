import type { PresnoArgs } from '../../types/presenter/presno-args/presno-args';

export default (presnoArgs: PresnoArgs): string => {
  if (presnoArgs.type === 'synPresno') {
    return String(presnoArgs.synoId);
  }

  if (presnoArgs.type === 'nonSynPresno') {
    return `${presnoArgs.parentId}-${presnoArgs.presnoIndex}`;
  }

  throw new Error('Bad presno args');
};
