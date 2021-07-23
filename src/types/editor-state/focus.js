// @flow
import type { MutableFocus } from './mutable/mutable-focus';

export type Focus = $ReadOnly<MutableFocus>;

// type FocusOnSyno = {
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
