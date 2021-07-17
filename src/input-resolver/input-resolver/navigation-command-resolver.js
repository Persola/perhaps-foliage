// @flow
import type { ReduxAction } from '../../types/redux-action';

export default (key: string): ReduxAction => {
  let direction;
  switch (key) {
    case 'left':
      direction = 'out';
      break;
    case 'right':
      direction = 'in';
      break;
    case 'up':
      direction = 'prev';
      break;
    case 'down':
      direction = 'next';
      break;
    default:
      throw new Error('should be unreachable');
  }

  return ({
    type: 'NAVIGATE',
    direction,
  });
};
