import type { RawSyno } from '../../../../types/syntactic/raw/raw-syno';
import type { RawSyntaxTree } from '../../../../types/syntactic/raw/raw-syntax-tree';

export default (tree: RawSyntaxTree): RawSyno => {
  const { synoMap } = tree;
  const synoIds = Object.keys(synoMap);

  if (synoIds.length === 0) {
    throw new Error('Cannot return root of empty syntax tree');
  }

  let currentSyno = synoMap[synoIds[0]];

  while (currentSyno.parentId) {
    currentSyno = synoMap[currentSyno.parentId];
  }

  return currentSyno;
};
