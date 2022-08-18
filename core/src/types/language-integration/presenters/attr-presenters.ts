import type { PresnoAttrVal } from '../../presenter/presnos/presno-attrs';
import type { Presenter } from '../../presenter/presenter';
import type { UnindexedPresnoArgs } from '../../presenter/presno-args/unindexed-presno-args';

export type NonChildAttrPresenter = (
  syno: Parameters<Presenter>[0],
  state: Parameters<Presenter>[1],
) => PresnoAttrVal;

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
