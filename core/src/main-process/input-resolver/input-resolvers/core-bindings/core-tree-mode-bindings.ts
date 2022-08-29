import type { KeyBindingList } from '../../../../types/input-resolver/key-binding-list';

const bindings: KeyBindingList = [
  {
    keys: ['Enter'],
    command: { type: 'START_INTERPRETATION' },
  },
  {
    keys: ['Backspace'],
    command: { type: 'DESTROY_FOCUSED_SYNO' },
  },
  {
    keys: ['ArrowUp'],
    command: {
      type: 'NAVIGATE',
      direction: 'prev',
    },
  },
  {
    keys: ['ArrowDown'],
    command: {
      type: 'NAVIGATE',
      direction: 'next',
    },
  },
  {
    keys: ['ArrowLeft'],
    command: {
      type: 'NAVIGATE',
      direction: 'out',
    },
  },
  {
    keys: ['ArrowRight'],
    command: {
      type: 'NAVIGATE',
      direction: 'in',
    },
  },
  {
    keys: ['ArrowLeft', ' '],
    command: {
      type: 'INSERT_BUD',
      direction: 'before',
    },
  },
  {
    keys: ['ArrowRight', ' '],
    command: {
      type: 'INSERT_BUD',
      direction: 'after',
    },
  },
];

export default bindings;
