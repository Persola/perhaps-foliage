import type { Navigate } from '../../../types/actions/navigate';

export default (input: string): Navigate => {
  let direction;

  switch (input) {
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

  return {
    type: 'NAVIGATE',
    direction,
  };
};
