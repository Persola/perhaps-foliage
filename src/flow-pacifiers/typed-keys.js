// @flow
export default (obj: {string: any}): string[] => {
  const keys = [];
  for (let propName in obj) {
    keys.push(propName);
  }

  return keys;
}
