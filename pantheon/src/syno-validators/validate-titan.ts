import { Titan } from '../types/synos/titan';

export default (
  titan: Titan,
): boolean => {
  return !titan.attrs.name.match(/^\w*$/);
};
