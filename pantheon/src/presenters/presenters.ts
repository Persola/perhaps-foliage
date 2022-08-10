import type { PresenterProvisions } from 'perhaps-foliage/dist/types/language-integration/presenters/presenters-provisions';

import presentTitan from './present-titan';
import presentOlympian from './present-olympian';

export default ({
  titan: presentTitan,
  olympian: presentOlympian,
} as PresenterProvisions);
