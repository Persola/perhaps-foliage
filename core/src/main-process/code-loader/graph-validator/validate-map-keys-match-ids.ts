// import invalidate from './invalidate';

// import type { SynoMap } from '../../../types/syntactic/syno-map';
// import type { ValidationResult } from '../../../types/code-loader/validation-result';

// export default (
//   graph: SynoMap,
// ): ValidationResult => {
//   const result = {
//     valid: true,
//     messages: [],
//   };

//   Object.entries(graph).forEach(([mapKeyForSyno, syno]) => {
//     if (mapKeyForSyno !== syno.id) {
//       invalidate(
//         result,
//         `Syno stored under key '${mapKeyForSyno}' has non-matching internal ID '${syno.id}'`,
//       );
//     }
//   });

//   return result;
// };
