import type { FocusedPresnoId } from '../focused-presno-id';

export type MutableFocus = {
  synoId: FocusedPresnoId;
  presnoIndex: number | null | undefined;
  charIndex: number | null | undefined;
}; // type FocusOnSyno = {
//   synoId: FocusedPresnoId,
//   presnoIndex: null,
//   charIndex: null
// };
//
// type FocusOnPresno = {
//   synoId: FocusedPresnoId,
//   presnoIndex: number,
//   charIndex: null
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
