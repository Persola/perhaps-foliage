import generateSyntypePresenter from './generate-syntype-presenter';

import { Grammar } from '../../../types/grammar/grammar';
import { PresenterProvisions } from '../../../types/language-integration/presenters/presenters-provisions';
import { Presenters } from '../../../types/presenter/presenters';

export default (
  grammar: Grammar,
  presenterProvisions: PresenterProvisions,
): Presenters => {
  const initializedPresenters = {};

  for (const [syntypeName, provision] of Object.entries(presenterProvisions)) {
    if (provision.constructor === Function) {
      initializedPresenters[syntypeName] = provision;
    } else {
      initializedPresenters[syntypeName] = generateSyntypePresenter(provision);
    }
  }

  return initializedPresenters;
};
