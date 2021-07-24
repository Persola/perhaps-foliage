import type { CharBackspace } from '../../types/actions/char-backspace';

export default (input: string): CharBackspace | null => {
  if (input === 'backspace') {
    return {
      type: 'CHAR_BACKSPACE',
    };
  }

  return null;
};
