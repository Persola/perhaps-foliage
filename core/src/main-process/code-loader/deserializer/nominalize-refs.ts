import type { RawSyntaxTreeWithStructuralRefs } from '../../../types/code-loader/deserialization/raw-syntax-tree-with-structural-refs';
import type { SynoMapWithStructuralRefs } from '../../../types/code-loader/deserialization/syno-map-with-structural-refs';
import type { InverseEdgeMap } from '../../../types/syntactic/raw/inverse-edge-map';
import type { IntertreeRefs, IntratreeRefs } from '../../../types/syntactic/raw/raw-syno';
import type { RawSyntaxTree } from '../../../types/syntactic/raw/raw-syntax-tree';
import type { SynoMap } from '../../../types/syntactic/raw/syno-map';
import type { AbsoluteSynoUri } from '../../../types/syntactic/syno-uri';

const derivePathToId = (
  synoMap: SynoMapWithStructuralRefs,
): {[path: string]: string} => {
  const pathToId = {};

  for (const syno of Object.values(synoMap)) {
    pathToId[syno.pathFromRoot.join('/')] = syno.id;
  }

  return pathToId;
};

const getFullPath = (
  referentRelativePathString: string,
  refererFullPath: number[],
): number[] => {
  const referentRelativePath = referentRelativePathString.split('/');

  let stepsUp = 0;

  while (referentRelativePath[stepsUp] === '..') {
    stepsUp += 1;
  }

  return refererFullPath.slice(
    0,
    stepsUp === 0 ? refererFullPath.length : -stepsUp,
  ).concat(
    referentRelativePath.slice(stepsUp).map(step => Number(step)),
  );
};

const matchesRelativeUri = (str: string) => {
  return /^(\.\.\/)*\d+(\/\d+)*$/.test(str);
};

const matchesAbsoluteUri = (str: string) => {
  return /^foli:\/\/editor-instance\.integrations\.\w+(\.\d+)+\.primitives(\/\d+)*\/?$/.test(str);
};

const addInverse = (
  inverseExtratreeEdges: InverseEdgeMap,
  referentId: string,
  refererId: string,
) => {
  if (inverseExtratreeEdges[referentId] === undefined) {
    inverseExtratreeEdges[referentId] = {};
  }

  inverseExtratreeEdges[referentId][refererId] = true;
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
  lastId: number,
): RawSyntaxTree => {
  const { rootId } = tree;
  const synoMapWithNominalRefs: SynoMap = {};
  const inverseExtratreeEdges: InverseEdgeMap = {};
  const dependencies: AbsoluteSynoUri[] = [];
  const pathToId = derivePathToId(tree.synoMap);

  for (const syno of Object.values(tree.synoMap)) {
    const intratreeRefs: IntratreeRefs = {};
    const intertreeRefs: IntertreeRefs = {};

    for (const [edgeLabel, referentUriString] of Object.entries(syno.extratreeRefs)) {
      if (matchesRelativeUri(referentUriString)) {
        const fullPath = getFullPath(referentUriString, syno.pathFromRoot);
        const referentId = pathToId[fullPath.join('/')];
        intratreeRefs[edgeLabel] = referentId;
        addInverse(inverseExtratreeEdges, referentId, syno.id);
      } else if (matchesAbsoluteUri(referentUriString)) {
        const refUri = deserializeAbsoluteUri(referentUriString);
        intertreeRefs[edgeLabel] = refUri;
        if (
          !dependencies.some(
            uri => uri.treeHost.join('.') === refUri.treeHost.join('.'),
          )
        ) {
          dependencies.push({
            type: 'absolute',
            treeHost: [...refUri.treeHost],
            path: [],
          });
        }
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
    dependencies,
    synoMap: synoMapWithNominalRefs,
    inverseExtratreeEdges,
    rootId,
    lastId,
  };
};
