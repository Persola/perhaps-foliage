// @flow
import type { OlympianPresAttrs } from './presno-attrs/olympian-attrs';
import type { CorePresnoAttrs } from './core-presno-attrs';

export type OlympianPres = {|
  ...CorePresnoAttrs,
  ...OlympianPresAttrs,
|}
