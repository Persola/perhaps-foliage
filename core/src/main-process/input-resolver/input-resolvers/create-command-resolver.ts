import type { Command } from '../../../types/actions/command';
import type { KeyBindingList } from '../../../types/input-resolver/key-binding-list';

export default (
  bindings: KeyBindingList,
) => {
  return (
    eventKey: string,
    keyStates: {[key: string]: ('up' | 'down' | 'used')},
  ): Command | void => {
    const matchingBindings = bindings.filter(
      binding => binding.keys.includes(eventKey),
    ).sort(
      (a, b) => b.keys.length - a.keys.length,
    );

    const mostKeysMatch = matchingBindings.find(
      binding => binding.keys.every(
        bindingKey => (bindingKey === eventKey) || (keyStates[bindingKey] === 'down'),
      ),
    );

    if (mostKeysMatch) {
      for (const matchKey of mostKeysMatch.keys) {
        if (matchKey !== eventKey) {
          keyStates[matchKey] = 'used';
        }
      }

      return mostKeysMatch.command;
    }
  };
};
