export default (oldState, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return oldState;
    case 'REPLACE_FOCUSED_NODE':
      return oldState;
    case 'UPDATE_RESULT':
      return action.resultRootId;
    case 'NAVIGATE':
      return oldState;
    case '@@redux/INIT':
      return oldState;
    default:
      throw new Error(`Unrecognized action type: '${action.type}'`);
  }
}
