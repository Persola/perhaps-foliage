import type { SynoMapWithStructuralRefs } from '../../../types/code-loader/deserialization/syno-map-with-structural-refs';
import type { SerializedSyno } from '../../../types/syntactic/newnew/serialized-syno';

const recursivelyDeserializeSubtree = (
  serializedTree: SerializedSyno,
  rootwardEdgeLabel: string | null,
  parentId: number | null,
  pathFromRoot: number[],
  synoMap: SynoMapWithStructuralRefs,
  idIterator: Generator<number>,
): number => {
  const synoId = idIterator.next().value;
  const { type, attrs, extratreeRefs, children } = serializedTree;
  const childIds: number[] = [];

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
