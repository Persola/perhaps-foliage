import type { RawSyntaxTreeWithStructuralRefs } from '../../../types/code-loader/deserialization/raw-syntax-tree-with-structural-refs';
import { SynoMapWithStructuralRefs } from '../../../types/code-loader/deserialization/syno-map-with-structural-refs';
import { InverseEdgeMap } from '../../../types/syntactic/newnew/raw/inverse-edge-map';
import { IntertreeRefs, IntratreeRefs } from '../../../types/syntactic/newnew/raw/raw-syno';
import type { RawSyntaxTree } from '../../../types/syntactic/newnew/raw/raw-syntax-tree';
import { SynoMap } from '../../../types/syntactic/newnew/raw/syno-map';
import { AbsoluteSynoUri } from '../../../types/syntactic/newnew/syno-uri';

const derivePathToId = (
  synoMap: SynoMapWithStructuralRefs,
): {[path: string]: string} => {
  const pathToId = {};

  for (const syno of Object.values(synoMap)) {
    pathToId[syno.pathFromRoot.join('/')] = syno.id;
  }

  return pathToId;
};

const matchesRelativeUri = (str: string) => {
  return /^(\.\.\/)*\d+(\/\d+)*$/.test(str);
};

const matchesAbsoluteUri = (str: string) => {
  return /^foli:\/\/editor-instance\.integrations\.\w+(\.\d+)+\.primitives(\/\d+)*\/?$/.test(str);
};

const rootifyPath = (path: string) => {
  let pathFromRoot = path;

  while (pathFromRoot.substring(0, 3) === '../') {
    pathFromRoot = pathFromRoot.substring(3);
  }

  return pathFromRoot;
};

const addInverse = (
  inverseExtraTreeEdges: InverseEdgeMap,
  referentId: string,
  refererId: string,
) => {
  if (inverseExtraTreeEdges[referentId] === undefined) {
    inverseExtraTreeEdges[referentId] = new Set();
  }

  inverseExtraTreeEdges[referentId].add(refererId);
};

const deserializeAbsoluteUri = (uri: string): AbsoluteSynoUri => {
  const uriMatch = uri.match(/^foli:\/\/([^./]+(\.[^./]+)*)((\/\d+)*)$/);
  const hostStr = uriMatch[1];
  const pathStr = uriMatch[3];
  const pathSteps = pathStr.split('/').filter(s => s !== '');
  const invalidPathSteps = pathSteps.filter(step => !/^\d+$/.test(step));
  if (invalidPathSteps.length > 0) {
    const prettySteps = invalidPathSteps.map(s => `'${s}'`).join(', ');
    throw new Error(`Syno URI path has invalid steps: ${prettySteps}`);
  }

  return {
    type: 'absolute',
    treeHost: hostStr.split('.'),
    path: pathSteps.map(s => Number(s)),
  };
};

export default (
  tree: RawSyntaxTreeWithStructuralRefs,
): RawSyntaxTree => {
  const { rootId } = tree;
  const synoMapWithNominalRefs: SynoMap = {};
  const inverseExtraTreeEdges: InverseEdgeMap = {};
  const pathToId = derivePathToId(tree.synoMap);

  for (const syno of Object.values(tree.synoMap)) {
    const intratreeRefs: IntratreeRefs = {};
    const intertreeRefs: IntertreeRefs = {};

    for (const [edgeLabel, referentUri] of Object.entries(syno.extratreeRefs)) {
      if (matchesRelativeUri(referentUri)) {
        const referentId = pathToId[rootifyPath(referentUri)];
        intratreeRefs[edgeLabel] = referentId;
        addInverse(inverseExtraTreeEdges, referentId, syno.id);
      } else if (matchesAbsoluteUri(referentUri)) {
        intertreeRefs[edgeLabel] = deserializeAbsoluteUri(referentUri);
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
