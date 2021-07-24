export default (actionType: string): void => {
  if (!(actionType.match("^@@INIT") || actionType.match("^@@redux/INIT"))) {
    throw new Error(`Unrecognized action type: '${actionType}'`);
  }
};
