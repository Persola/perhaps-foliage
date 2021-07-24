const SYNTYPE_ATTRS = ['rootable', 'children', 'textHostRef'];

import type { Grammar } from '../types/editor-state/grammar';

type grammarValidationResult = { valid: boolean, message: string };

export default ((grammar: Grammar): grammarValidationResult => {
  let valid = true;
  let message = '';

  Object.entries(grammar).forEach(([syntype, syntypeAttrs]) => {
    if (typeof syntype !== 'string') {
      valid = false;
      message += `Syntype '${syntype}' has invalid name. `;
    }

    const invalidAttrs = Object.keys(syntypeAttrs).filter(attr => !SYNTYPE_ATTRS.includes(attr));

    if (invalidAttrs.length > 0) {
      valid = false;
      message += `Syntype '${syntype}' has invalid attributes: ${invalidAttrs}. `;
    }

    const missingAttrs = SYNTYPE_ATTRS.filter(attr => !Object.keys(syntypeAttrs).includes(attr));

    if (missingAttrs.length > 0) {
      valid = false;
      message += `Syntype '${syntype}' is missing attributes: ${missingAttrs}. `;
    }

    if (!(syntypeAttrs.rootable === false || syntypeAttrs.rootable === true)) {
      valid = false;
      message += `Syntype '${syntype}' has invalid rootability: '${syntypeAttrs.rootable}. '`;
    }

    if (!(syntypeAttrs.textHostRef === null || typeof syntypeAttrs.textHostRef === 'string')) {
      valid = false;
      message += `Syntype '${syntype}' has invalid textHostRef: '${syntypeAttrs.textHostRef}. '`;
    }

    Object.entries(syntypeAttrs.children).forEach(([childSyntype, childSyntypeAttrs]) => {
      if (typeof childSyntype !== 'string') {
        valid = false;
        message += `Child relation of syntype '${syntype}' has invalid name '${childSyntype}. '`;
      }

      if (typeof childSyntypeAttrs.syntype !== 'string') {
        valid = false;
        message += `Child relation of syntype '${syntype}' has invalid syntype '${childSyntypeAttrs.syntype}. '`;
      }

      if (!(childSyntypeAttrs.collection === false || childSyntypeAttrs.collection === true)) {
        valid = false;
        message += `Child relation of syntype '${syntype}' has invalid plurality: '${childSyntypeAttrs.collection}. '`;
      }
    });
  });

  return {
    valid,
    message
  };
});