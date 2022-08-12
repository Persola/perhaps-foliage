import { StateSelector } from '../state-selector';
import { Syno } from '../syntactic/syno';
import { SynPresnoArgs } from './presno-args/syn-presno-args';

export type SynoPresenterArgs = {
  syno: Syno,
  _: StateSelector,
  childSynPresnoArgs: { [childSynPresnoArgsKey: string]: SynPresnoArgs }
};
