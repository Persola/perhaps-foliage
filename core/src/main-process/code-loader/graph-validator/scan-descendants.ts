// import invalidate from './invalidate';
// import printList from './print-list';
// import multipleParentsIds from './multiple-parent-ids';
// import validateChildSyntype from './validate-child-syntype';

// import type { SynoMap } from '../../../types/syntactic/syno-map';
// import type { Syno } from '../../../types/syntactic/syno';
// import type { Grammar } from '../../../types/grammar/grammar';
// import type { ValidationResult } from '../../../types/code-loader/validation-result';

// /**
//  * Use depth-first search to scan a nodes in the tree recursively, keeping track of all nodes found
//  * in synosAccountedFor. Update validation result to upon encountering multiple parents, cycles,
//  * missing children, parent/child reference mismatches, and child syntypes not matching the grammar.
// */
// const scanDescendants = (
//   currentSyno: Syno,
//   result: ValidationResult,
//   graph: SynoMap,
//   grammar: Grammar,
//   synosAccountedFor: Record<string, boolean>,
//   primitives: SynoMap,
// ): void => {
//   if (synosAccountedFor[currentSyno.id] !== false) {
//     // this covers cycles, too
//     invalidate(result, (
//       `Syno (ID ${currentSyno.id}) has multiple parents`
//       + ` (IDs ${printList(multipleParentsIds(graph, currentSyno.id))})`
//     ));

//     return; // escape cycle
//   }

//   synosAccountedFor[currentSyno.id] = true;

//   forChildSynoOf(currentSyno, (childRef, childEdge) => {
//     if (graph[childRef.id] === undefined) {
//       if (primitives[childRef.id] === undefined) {
//         invalidate(result, (
//           `Syno (ID ${currentSyno.id}) contains child reference`
//           + ` to non-existing syno of ID '${childRef.id}'`
//         ));
//       }
//     } else {
//       const child = graph[childRef.id];
//       if (child.parent.id !== currentSyno.id) {
//         invalidate(result, (
//           `Syno (ID ${currentSyno.id}) has child ref with ID '${childRef.id}', which does not match`
//           + ` syno (ID ${child.id}) with parent ref with ID '${child.parent.id}'`
//         ));
//       }

//       // thus we don't require a collection of children to have the same syntype,
//       // just each to appear individually on the list
//       validateChildSyntype(
//         grammar,
//         currentSyno,
//         childEdge.key,
//         child,
//         result,
//         childRef,
//       );

//       scanDescendants(
//         graph[childRef.id],
//         result,
//         graph,
//         grammar,
//         synosAccountedFor,
//         primitives,
//       );
//     }
//   });
// };

// export default scanDescendants;
