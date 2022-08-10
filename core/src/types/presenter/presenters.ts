import { Presenter } from './presenter';

export type Presenters = Readonly<{
  [syntype: string]: Presenter
}>;
