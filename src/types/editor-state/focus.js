// @flow
import type { MutableFocus } from './mutable/mutable-focus';

export type Focus = $ReadOnly<MutableFocus>;

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
