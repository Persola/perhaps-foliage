import type { RawSyno } from '../../../types/syntactic/newnew/raw/raw-syno';
import type { RawSyntaxTree } from '../../../types/syntactic/newnew/raw/raw-syntax-tree';

export default (tree: RawSyntaxTree): RawSyno => {
  const synoIds = Object.keys(tree);

  if (synoIds.length === 0) {
    throw new Error('Cannot return root of empty syntax tree');
  }

  let currentSyno = tree[Object.keys(tree)[0]];

  while (currentSyno.parentId) {
    currentSyno = tree[currentSyno.parentId];
  }

  return currentSyno;
};
