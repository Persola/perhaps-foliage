import { PresenterProvision } from './presenter-provision';

export type PresenterProvisions = Readonly<{
  [syntype: string]: PresenterProvision
}>;
