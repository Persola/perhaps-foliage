// import type { JSONSchema7Type } from 'json-schema';

// import synoRef from './syno-ref';

// import type { GrammarSyntypeEntry } from '../../../types/grammar/syntype';

// type ChildRelationEntry = { collection: boolean };

// const isOneOfObject = obj => {
//   const keys = Object.keys(obj);
//   return keys.length === 1 && keys[0] === 'oneOf';
// };

// const allowedOptions = oneOfOrNormal => {
//   if (isOneOfObject(oneOfOrNormal)) {
//     return oneOfOrNormal.oneOf;
//   }

//   return [oneOfOrNormal];
// };

// const mergePropOptions = (firstValue, secondValue) => {
//   return {
//     oneOf: [
//       ...allowedOptions(firstValue),
//       ...allowedOptions(secondValue),
//     ],
//   };
// };

// // handles childRef/nonTreeRef props with same name
// // (functionally an OR on which of those types a prop can be)
// // TODO: revise grammar format to express that OR directly
// const mergeProps = (existingProps, newProp) => {
//   const existingPropKeys = Object.keys(existingProps);
//   const newPropKey = Object.keys(newProp)[0];
//   if (!existingPropKeys.includes(newPropKey)) {
//     Object.assign(existingProps, newProp);
//   } else {
//     Object.assign(existingProps, {
//       [newPropKey]: mergePropOptions(
//         existingProps[newPropKey],
//         newProp[newPropKey],
//       ),
//     });
//   }
// };

// const refProps = (
//   syntypeGrammarEntry: GrammarSyntypeEntry,
// ): Record<string, JSONSchema7Type> => {
//   const props = {};

//   Object.entries(syntypeGrammarEntry.children).forEach(
//     ([childRelationName, childRelationEntry]) => {
//       props[childRelationName] = (
//         !(childRelationEntry as ChildRelationEntry).collection
//           ? synoRef('child')
//           : {
//             type: 'array',
//             items: synoRef('child'),
//           }
//       );
//     },
//   );

//   Object.keys(syntypeGrammarEntry.extratreeRefs).forEach(nonTreeRefName => {
//     mergeProps(props, {
//       [nonTreeRefName]: synoRef('non-tree'),
//     });
//   });

//   return props;
// };

// export default (syntypeGrammarEntry: GrammarSyntypeEntry): Record<string, JSONSchema7Type> => {
//   const props = refProps(syntypeGrammarEntry);

//   Object.entries(syntypeGrammarEntry.properties).forEach(([propName, propType]) => {
//     props[propName] = { type: propType };
//   });

//   return props;
// };
