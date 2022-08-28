import type { DestroyFocusedSyno } from '../../../../types/actions/commands/destroy-focused-syno';
import type { StartInterpretation } from '../../../../types/actions/start-interpretation';
import type { Navigate } from '../../../../types/actions/commands/navigate';

const inputToDirection = {
  left: 'out',
  right: 'in',
  up: 'prev',
  down: 'next',
};

const navigationCommandCreator = (input: string): Navigate => {
  return {
    type: 'NAVIGATE',
    direction: inputToDirection[input],
  };
};

export default {
  enter: (input, state, integration): StartInterpretation => ({
    type: 'START_INTERPRETATION',
  }),
  backspace: (input, state, integration): DestroyFocusedSyno => ({
    type: 'DESTROY_FOCUSED_SYNO',
    focusedPresnoId: state.focusedSynoId(),
  }),
  down: navigationCommandCreator,
  up: navigationCommandCreator,
  left: navigationCommandCreator,
  right: navigationCommandCreator,
};
