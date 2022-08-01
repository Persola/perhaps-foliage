import type { Render } from './messages-from-main/render';
import type { Warn } from './messages-from-main/warn';
import type { DispatchAction } from './messages-from-renderer/dispatch-action';
import type { ResolveInput } from './messages-from-renderer/resolve-input';

export type CrossContextMessageData = (
  | Render
  | Warn
  | DispatchAction
  | ResolveInput
);
