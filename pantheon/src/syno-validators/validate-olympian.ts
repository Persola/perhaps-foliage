import { Olympian } from '../types/synos/olympian';

export default (
  olympian: Olympian,
): boolean => {
  return !olympian.attrs.name.match(/^\w*$/);
};
