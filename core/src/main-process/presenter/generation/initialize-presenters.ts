import generateSyntypePresenter from './generation/generate-syntype-presenter';

import { Grammar } from '../../../types/grammar/grammar';
import { PresenterProvisions } from '../../../types/language-integration/presenters/presenters-provisions';
import { Presenters } from '../../../types/presenter/presenters';
import { PresenterConfig } from '../../../types/language-integration/presenters/presenter-config';

export default (
  grammar: Grammar,
  presenterProvisions: PresenterProvisions,
): Presenters => {
  const initializedPresenters = {};

  for (const [syntypeName, provision] of Object.entries(presenterProvisions)) {
    if (provision.constructor === Function) {
      initializedPresenters[syntypeName] = provision;
    } else {
      initializedPresenters[syntypeName] = generateSyntypePresenter(
        syntypeName,
        provision as PresenterConfig,
        grammar[syntypeName],
      );
    }
  }

  return initializedPresenters;
};
