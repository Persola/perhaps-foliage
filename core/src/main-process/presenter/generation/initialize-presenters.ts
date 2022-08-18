import generateSyntypePresenter from './generate-syntype-presenter';

import { PresenterProvisions } from '../../../types/language-integration/presenters/presenters-provisions';
import { Presenters } from '../../../types/presenter/presenters';
import { PresenterConfig } from '../../../types/language-integration/presenters/presenter-config';

export default (
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
      );
    }
  }

  return initializedPresenters;
};
