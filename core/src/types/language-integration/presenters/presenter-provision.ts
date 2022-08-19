import type { PresenterConfig } from './presenter-config';
import type { SynoPresenter } from '../../presenter/presenter';

export type PresenterProvision = (
  | PresenterConfig
  | SynoPresenter
);
