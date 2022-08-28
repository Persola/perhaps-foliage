import { CommandResolver } from './command-resolver';

export type InputToCommandResolver = {
  readonly [inputMatcher: string]: CommandResolver;
};
