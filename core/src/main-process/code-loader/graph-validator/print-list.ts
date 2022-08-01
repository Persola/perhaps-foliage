export default (list: string[]): string => {
  if (list.length === 1) {
    return list[0];
  }

  return list.map(attr => `'${attr}'`).join(', ');
};
