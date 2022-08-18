// import invalidate from './invalidate';
// import printList from './print-list';

// import type { Syno } from '../../../types/syntactic/syno';
// import type { SynoRef } from '../../../types/syntactic/syno-ref';
// import type { Grammar } from '../../../types/grammar/grammar';
// import type { ValidationResult } from '../../../types/code-loader/validation-result';

// export default (
//   grammar: Grammar,
//   parent: Syno,
//   childKey: string,
//   child: Syno,
//   result: ValidationResult,
//   childRef: SynoRef,
// ): void => {
//   const childSyntypeEntry = grammar[parent.syntype].children[childKey].syntype;
//   const acceptableChildSyntypes = (
//     childSyntypeEntry instanceof Array
//       ? childSyntypeEntry
//       : [childSyntypeEntry]
//   );
//   if (!acceptableChildSyntypes.includes(child.syntype)) {
//     invalidate(result, (
//       `Syno (ID ${parent.id}) has child (ID ${childRef.id}) of syntype '${child.syntype}'`
//       + `, under relation '${childKey}', which requires children of `
//       + (
//         acceptableChildSyntypes.length === 1
//           ? `syntype '${acceptableChildSyntypes[0]}'`
//           : `a syntype among: ${printList(acceptableChildSyntypes)}`
//       )
//     ));
//   }
// };
