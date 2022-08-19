import type { PresnoAttrVal } from '../../presenter/presnos/presno-attrs';
import type { SynoPresenter } from '../../presenter/presenter';
import type { UnindexedPresnoArgs } from '../../presenter/presno-args/unindexed-presno-args';

export type NonChildAttrPresenter = (
  syno: Parameters<SynoPresenter>[0],
  state: Parameters<SynoPresenter>[1],
) => PresnoAttrVal;

export type ChildAttrPresenter = (
  syno: Parameters<SynoPresenter>[0],
  state: Parameters<SynoPresenter>[1],
) => (UnindexedPresnoArgs | UnindexedPresnoArgs[]);

export type AttrPresenters = [
  {
    [presnoNonChildAttrName: string]: NonChildAttrPresenter,
  },
  {
    [presnoChildAttrName: string]: ChildAttrPresenter,
  }
];
