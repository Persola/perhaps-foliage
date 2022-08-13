import type { PresnoNonChildAttrVal } from '../../presenter/presnos/presno-attrs';
import { Presenter } from '../../presenter/presenter';
import { UnindexedPresnoArgs } from '../../presenter/presno-args/unindexed-presno-args';

export type NonChildAttrPresenter = (
  syno: Parameters<Presenter>[0],
  state: Parameters<Presenter>[1],
) => PresnoNonChildAttrVal;

export type ChildAttrPresenter = (
  syno: Parameters<Presenter>[0],
  state: Parameters<Presenter>[1],
) => (UnindexedPresnoArgs | UnindexedPresnoArgs[]);

export type AttrPresenters = [
  {
    [presnoNonChildAttrName: string]: NonChildAttrPresenter,
  },
  {
    [presnoChildAttrName: string]: ChildAttrPresenter,
  }
];
