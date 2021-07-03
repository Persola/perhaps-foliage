// @flow
import type { SynoRef } from './syno-ref';

export type NamePartRef = {|
  +synoRef: false,
  +parent: SynoRef,
  +index: number,
|}
