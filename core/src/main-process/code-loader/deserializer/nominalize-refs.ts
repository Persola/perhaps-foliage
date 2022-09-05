import type { RawSyntaxTreeWithStructuralRefs } from '../../../types/code-loader/deserialization/raw-syntax-tree-with-structural-refs';
import { SynoMapWithStructuralRefs } from '../../../types/code-loader/deserialization/syno-map-with-structural-refs';
import type { RawSyntaxTree } from '../../../types/syntactic/newnew/raw/raw-syntax-tree';

const derivePathToId = (
  synoMap: SynoMapWithStructuralRefs,
) => {
  const pathToId = {};

  for (const syno of Object.values(synoMap)) {
    pathToId[syno.pathFromRoot.join('/')] = syno.id;
  }

  return pathToId;
};

const matchesRelativeUri = (str: string) => {
  return str.match(/(..\/)*\d(\/\d)*/);
};

const matchesAbsoluteUri = (str: string) => {
  return str.match(/foli:\/\/editor-instance\.integrations\.\w+(\.\d+)+\.primitives\/\d(\/\d)*/);
};

const rootifyPath = (path: string) => {
  let pathFromRoot = path;

  while (pathFromRoot.substring(0, 3) === '../') {
    pathFromRoot = pathFromRoot.substring(3);
  }

  return pathFromRoot;
};

const addInverse = (inverseExtraTreeEdges, referentId, synoId) => {
  if (inverseExtraTreeEdges[referentId] === undefined) {
    inverseExtraTreeEdges[referentId] = new Set();
  }

  inverseExtraTreeEdges[referentId].add(synoId);
};

export default (
  tree: RawSyntaxTreeWithStructuralRefs,
): RawSyntaxTree => {
  const { rootId } = tree;
  const synoMapWithNominalRefs = {};
  const inverseExtraTreeEdges = {};
  const pathToId = derivePathToId(tree.synoMap);

  for (const syno of Object.values(tree.synoMap)) {
    const intratreeRefs = {};
    const intertreeRefs = {};

    for (const [edgeLabel, synoUri] of Object.entries(syno.extratreeRefs)) {
      if (matchesRelativeUri(synoUri)) {
        const referentId = pathToId[rootifyPath(synoUri)];
        intratreeRefs[edgeLabel] = referentId;
        addInverse(inverseExtraTreeEdges, referentId, syno.id);
      } else if (matchesAbsoluteUri(synoUri)) {
        intertreeRefs[edgeLabel] = synoUri;
      } else {
        throw new Error(
          'Serialized syno contains bad extratree ref'
          + ` (syno path: ${syno.pathFromRoot.join('/')})`,
        );
      }
    }

    const { id, type, attrs, rootwardEdgeLabel, parentId, childIds } = syno;

    synoMapWithNominalRefs[syno.id] = {
      id,
      type,
      attrs,
      rootwardEdgeLabel,
      parentId,
      childIds,
      intratreeRefs,
      intertreeRefs,
    };
  }

  return {
    synoMap: synoMapWithNominalRefs,
    inverseExtraTreeEdges,
    rootId,
  };
};
