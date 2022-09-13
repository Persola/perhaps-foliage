import type { InitPerhapsFoliage } from '../../actions/init-perhaps-foliage';
import type { StartIntegrationHotload } from '../../actions/start-integration-hotload';
import type { SetFocusSyno } from '../../actions/commands/set-focus-syno';

export type DispatchAction = {
  action: (
    | InitPerhapsFoliage
    | StartIntegrationHotload
    | SetFocusSyno
  ),
};
