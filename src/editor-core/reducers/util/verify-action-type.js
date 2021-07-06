// @flow

export default (actionType: string): void => {
  if (
    (
      actionType.match('^@@INIT')
      || actionType.match('^@@redux/INIT')
    ) === null
  ) {
    throw new Error(`Unrecognized action type: '${actionType}'`);
  }
};
