// @flow
function typedValues<T> (obj: {mixed: T}): T[] {
  const values = [];
  for (let propName in obj) {
    values.push(obj[propName]);
  }

  return values;
}

export default typedValues
