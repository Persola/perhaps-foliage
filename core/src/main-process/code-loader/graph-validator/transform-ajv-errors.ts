// import * as Ajv from 'ajv';

// import type { JSONSchema7Definition } from 'json-schema';
// import type { Grammar } from '../../../types/grammar/grammar';

// function uniq<Type>(arr: Type[]): Type[] { return [...new Set(arr)]; }
// const range = max => [...Array(max).keys()];

// const escapees = ['^', '$', '[', ']', '(', ')', '{', '}'];
// const regexpEscape = str => [...str].map(chr => (escapees.includes(chr) ? `\\${chr}` : chr)).join('');

// const printErrorParams = params => {
//   return Object.entries(params).map(pair => `${pair[0]}: ${pair[1]}`).join(', ');
// };
// const printError = e => {
//   return `Data at path ${e.dataPath} ${e.message} (${printErrorParams(e.params)})`;
// };

// const errorsOfDataPath = (
//   errors: Ajv.ErrorObject[],
//   pathMatch: (string | string[]),
//   invert = false,
// ) => {
//   if (typeof pathMatch === 'string') {
//     return errors.filter(error => {
//       const matches = error.dataPath.match(new RegExp(regexpEscape(pathMatch)));
//       return invert ? !matches : matches;
//     });
//   }

//   return errors.filter(error => {
//     const matches = pathMatch.some(dataPath => {
//       return error.dataPath.match(new RegExp(regexpEscape(dataPath)));
//     });

//     return invert ? !matches : matches;
//   });
// };

// /**
//  * When a syno doesn't correctly match its syntype, ajv surfaces the errors it had with each
//  * possible syntype because it doesn't know which it belongs to. When there is a syntype schema
//  * that doesn't get a syntype error, i.e., the syno has a syntype property that matches that
//  * syntype schema, we assume the syntype property is correct, i.e. that the syno is really is of
//  * that syntype. So we filter out errors from all the other syntype schemas and surface only that
//  * one's.
// */
// export default (
//   ajvErrors: Ajv.ErrorObject[],
//   synoMapSchema: JSONSchema7Definition,
//   graph: unknown,
//   grammar: Grammar,
// ): string[] => {
//   const errorsToSurface = [];

//   // @ts-ignore: this is (and must remain) in sync with schemas
//   const syntypeCount = synoMapSchema.patternProperties['^.*$'].oneOf.length;

//   const syntypeMismatchErrors = ajvErrors.filter(e => e.dataPath.match(/\.syntype$/));
//   const syntypeMismatchErrorRootDataPaths = uniq(
//     syntypeMismatchErrors.map(e => e.dataPath.match(/^(.*)\.syntype$/)[1]),
//   );

//   // dataPaths WITHOUT syntype errors: surface all errors
//   errorsOfDataPath(
//     ajvErrors,
//     syntypeMismatchErrorRootDataPaths,
//     true,
//   ).forEach(e => {
//     errorsToSurface.push(printError(e));
//   });

//   // dataPaths WITH syntype errors: surface only syntype errors
//   syntypeMismatchErrorRootDataPaths.forEach(syntypeMismatchRootPath => {
//     const thisDataPathErrors = errorsOfDataPath(ajvErrors, syntypeMismatchRootPath);

//     const syntacticTypeSchemaWithoutSyntypePropErrorIndex = range(syntypeCount).find(syntypeInd => {
//       return thisDataPathErrors.every(error => {
//         return !error.schemaPath.match(
//           new RegExp(
//             // this is (and must remain) in sync with schemas
//             `^#/patternProperties/%5E.*%24/oneOf/${syntypeInd}/properties/syntype`,
//           ),
//         );
//       });
//     });

//     if (syntacticTypeSchemaWithoutSyntypePropErrorIndex === undefined) {
//       // if there wasn't a path without a syntype error it probably actually was a syntype error
//       const validSyntypes = Object.keys(grammar);
//       const badSyntypeSynoId = syntypeMismatchRootPath.match(/\['([^']*)'\]/)[1];
//       const badSyntypeSyno = graph[badSyntypeSynoId];
//       if (badSyntypeSyno && !validSyntypes.includes(badSyntypeSyno.syntype)) {
//         // syno has a syntype not listed in grammar
//         errorsToSurface.push(`Syno (ID ${badSyntypeSynoId}) has invalid syntype '${badSyntypeSyno.syntype}'`);
//       } else {
//         // something else, just surface everything
//         thisDataPathErrors.forEach(e => {
//           errorsToSurface.push(printError(e));
//         });
//       }
//     } else {
//       // Assume syno had the right syntype, wrong everything else. Surface errors from that syntype.
//       thisDataPathErrors.filter(e => {
//         return e.schemaPath.match(
//           new RegExp(
//             // this is (and must remain) in sync with schemas
//             `^#/patternProperties/%5E.*%24/oneOf/${syntacticTypeSchemaWithoutSyntypePropErrorIndex}`,
//           ),
//         );
//       }).forEach(e => {
//         errorsToSurface.push(printError(e));
//       });
//     }
//   });

//   return errorsToSurface;
// };
