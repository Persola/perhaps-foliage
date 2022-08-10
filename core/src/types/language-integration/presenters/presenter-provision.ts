import type { PresenterConfig } from './presenter-config';
import type { Presenter } from '../../presenter/presenter';

export type PresenterProvision = (
  | PresenterConfig
  | Presenter
);
