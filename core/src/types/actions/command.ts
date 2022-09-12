import type { CharBackspace } from './commands/char-backspace';
import type { DestroyFocusedSyno } from './commands/destroy-focused-syno';
import type { ExitTextPresno } from './commands/exit-text-presno';
import type { InsertBud } from './commands/insert-bud';
import type { Navigate } from './commands/navigate';
import type { SetFocusSyno } from './commands/set-focus-syno';
import type { StartInterpretation } from './commands/start-interpretation';
import type { TextNavigate } from './commands/text-navigate';

export type Command = (
  | CharBackspace
  | DestroyFocusedSyno
  | ExitTextPresno
  | InsertBud
  | Navigate
  | SetFocusSyno
  | StartInterpretation
  | TextNavigate
);
