// @flow

export default (actionType: string): void => {
    if (
        null === (
            actionType.match('^@@INIT') ||
            actionType.match('^@@redux/INIT')
        )
    ) {
        throw new Error(`Unrecognized action type: '${actionType}'`);
    }
}
