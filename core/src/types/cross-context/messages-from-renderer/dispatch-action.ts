import type { InitPerhapsFoliage } from '../../actions/init-perhaps-foliage';
import type { StartIntegrationHotload } from '../../actions/start-integration-hotload';

export type DispatchAction = {
  action: (
    InitPerhapsFoliage
    | StartIntegrationHotload
  ),
};
