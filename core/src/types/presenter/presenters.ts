import { SynoPresenter } from './presenter';

export type Presenters = Readonly<{
  [syntype: string]: SynoPresenter
}>;
