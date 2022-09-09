import StateMutator from '../../mutators/state-mutator';

export default (
  state: StateMutator,
): void => {
  state.state.loadingIntegration = true;
};
