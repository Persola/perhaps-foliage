import type { SynoMapWithStructuralRefs } from '../../../types/code-loader/deserialization/syno-map-with-structural-refs';
import type { SerializedSyno } from '../../../types/syntactic/serialized-syno';

const recursivelyDeserializeSubtree = (
  serializedTree: SerializedSyno,
  rootwardEdgeLabel: string | null,
  parentId: string | null,
  pathFromRoot: number[],
  synoMap: SynoMapWithStructuralRefs,
  idIterator: Generator<string>,
): string => {
  const synoId: string = idIterator.next().value;
  const { type } = serializedTree;
  const attrs = serializedTree?.attrs || {};
  const extratreeRefs = serializedTree?.extratreeRefs || {};
  const children = serializedTree?.children || [];
  const childIds: string[] = [];

  children.forEach((entry, childIndex) => {
    const [edgeLabel, child] = entry;

    childIds.push(
      recursivelyDeserializeSubtree(
        child,
        edgeLabel,
        synoId,
        pathFromRoot.concat([childIndex]),
        synoMap,
        idIterator,
      ),
    );
  });

  synoMap[synoId] = {
    id: synoId,
    type,
    attrs,
    rootwardEdgeLabel,
    parentId,
    childIds,
    extratreeRefs,
    pathFromRoot,
  };

  return synoId;
};

export default recursivelyDeserializeSubtree;
