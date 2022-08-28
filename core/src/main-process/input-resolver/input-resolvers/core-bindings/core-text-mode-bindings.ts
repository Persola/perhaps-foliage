import type { CharBackspace } from '../../../../types/actions/commands/char-backspace';
import type { ExitTextPresno } from '../../../../types/actions/commands/exit-text-presno';
import type { TextNavigate } from '../../../../types/actions/commands/text-navigate';

export default {
  enter: (input, state, integration): ExitTextPresno => ({
    type: 'EXIT_TEXT_PRESNO',
  }),
  left: (input, state, integration): ExitTextPresno => ({
    type: 'EXIT_TEXT_PRESNO',
  }),
  up: (input, state, integration): TextNavigate => ({
    type: 'TEXT_NAVIGATE',
    direction: 'prev',
  }),
  down: (input, state, integration): TextNavigate => ({
    type: 'TEXT_NAVIGATE',
    direction: 'next',
  }),
  backspace: (input, state, integration): CharBackspace => ({
    type: 'CHAR_BACKSPACE',
  }),
};
