export default (oldState, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return oldState;
    case 'REPLACE_FOCUSED_NODE':
      return true;
    case 'UPDATE_RESULT':
      return false;
    case 'NAVIGATE':
      return oldState;
    case '@@redux/INIT':
      return oldState;
    default:
      throw new Error(`Unrecognized action type: '${action.type}'`);
  }
}
