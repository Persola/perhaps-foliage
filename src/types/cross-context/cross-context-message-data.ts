import type { Render } from './messages-from-core/render';
import type { DispatchAction } from './messages-from-renderer/dispatch-action';
import type { ResolveInput } from './messages-from-renderer/resolve-input';

export type CrossContextMessageData = (
  | Render
  | DispatchAction
  | ResolveInput
);
