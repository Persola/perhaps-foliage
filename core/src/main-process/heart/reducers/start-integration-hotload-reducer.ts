import StateMutator from '../../state-interface/state-mutator';

export default (
  state: StateMutator,
): void => {
  state.state.loadingIntegration = true;
};
