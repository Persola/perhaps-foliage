import type { RawSyntaxTree } from '../../../../types/syntactic/raw/raw-syntax-tree';

const recursivelyAddDescendants = (
  synoId: string,
  tree: RawSyntaxTree,
  descendants: string[],
): string[] => {
  const syno = tree.synoMap[synoId];

  for (const childId of syno.childIds) {
    recursivelyAddDescendants(childId, tree, descendants);
  }

  descendants.push(synoId);

  return descendants;
};

export default (
  synoId: string,
  tree: RawSyntaxTree,
): string[] => {
  return recursivelyAddDescendants(synoId, tree, []);
};
