import type { Command } from '../actions/command';

type KeyBinding = {
  keys: string[],
  command: Command,
};

export type KeyBindingList = KeyBinding[];
