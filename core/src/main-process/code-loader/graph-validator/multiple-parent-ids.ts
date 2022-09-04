// import type { SynoMap } from '../../../types/syntactic/syno-map';
// import type { Syno } from '../../../types/syntactic/syno';

// /**
//  * Parent IDs of a node with multiple parents
// */
// export default (
//   graph: SynoMap,
//   childId: string,
// ): string[] => {
//   const parents: Syno[] = Object.values(graph).filter(syno => {
//     let isParent = false;
//     forChildSynoOf(syno, childRef => {
//       if (childRef.id === childId) {
//         isParent = true;
//       }
//     });
//     return isParent;
//   });

//   return parents.map(p => p.id);
// };
