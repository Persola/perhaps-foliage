// import forSynoRefFrom from '../../../syntree-utils/read-node/for-syno-ref-from';
// import invalidate from './invalidate';

// import type { SynoMap } from '../../../types/syntactic/syno-map';
// import type { Grammar } from '../../../types/grammar/grammar';
// import type { ValidationResult } from '../../../types/code-loader/validation-result';

// export default (
//   graph: SynoMap,
//   grammar: Grammar,
//   primitives: SynoMap,
// ): ValidationResult => {
//   const result = {
//     valid: true,
//     messages: [],
//   };

//   Object.values(graph).forEach(syno => {
//     forSynoRefFrom(syno, (synoRef, edge) => {
//       const { key } = edge;
//       if (synoRef.relation === 'non-tree') {
//         const referent = graph[synoRef.id];
//         if (referent === undefined) {
//           if (primitives[synoRef.id] === undefined) {
//             invalidate(
//               result,
//               `Syno (ID ${syno.id}) contains reference to missing syno (ID ${synoRef.id})`,
//             );
//           }
//         } else {
//           const expectedSyntype = grammar[syno.syntype].nonTreeRefs[key];
//           if (referent.syntype !== expectedSyntype) {
//             invalidate(
//               result,
//               `Syno (ID ${syno.id}) contains reference to syno (ID ${referent.id})`
//               + ` of syntype '${referent.syntype}' under '${key}',`
//               + ` but grammar restricts '${key}' references to syntype '${expectedSyntype}'`,
//             );
//           }
//         }
//       }
//     });
//   });

//   return result;
// };
