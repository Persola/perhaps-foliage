import type { KeyBindingList } from '../../../../types/input-resolver/key-binding-list';

const bindings: KeyBindingList = [
  {
    keys: ['Enter'],
    command: { type: 'EXIT_TEXT_PRESNO' },
  },
  {
    keys: ['ArrowLeft'],
    command: { type: 'EXIT_TEXT_PRESNO' },
  },
  {
    keys: ['ArrowUp'],
    command: {
      type: 'TEXT_NAVIGATE',
      direction: 'prev',
    },
  },
  {
    keys: ['ArrowDown'],
    command: {
      type: 'TEXT_NAVIGATE',
      direction: 'next',
    },
  },
  {
    keys: ['Backspace'],
    command: { type: 'CHAR_BACKSPACE' },
  },
];

export default bindings;