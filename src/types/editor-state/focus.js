// @flow
import type { FocusedPresnoId } from './focused-presno-id';

export type Focus = {|
  +synoId: FocusedPresnoId,
  +presnoIndex: (number | false),
  +charIndex: (number | false),
|}

// type FocusOnSyno = {
//   synoId: FocusedPresnoId,
//   presnoIndex: false,
//   charIndex: false
// };
//
// type FocusOnPresno = {
//   synoId: FocusedPresnoId,
//   presnoIndex: number,
//   charIndex: false
// };
//
// type FocusInTextPresno = {
//   synoId: FocusedPresnoId,
//   presnoIndex: number,
//   charIndex: number
// };
//
// export type Focus = (
//   | FocusOnSyno
//   | FocusOnPresno
//   | FocusInTextPresno
// );
