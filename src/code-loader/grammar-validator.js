const SYNTYPE_ATTRS = [
  'rootable',
  'children',
  'textHostRef',
];

const validationFailure = message => {
  return {
    valid: false,
    message,
  };
};

export default grammar => {
  Object.entries(grammar).forEach(([syntype, syntypeAttrs]) => {
    if (typeof syntype !== 'string') {
      return validationFailure(`syntype '${syntype}' has invalid name`);
    }

    const invalidAttrs = Object.keys(syntypeAttrs).filter(attr => !SYNTYPE_ATTRS.includes(attr));
    if (invalidAttrs.length > 0) {
      return validationFailure(`syntype '${syntype}' has invalid attributes: ${invalidAttrs}`);
    }

    const missingAttrs = SYNTYPE_ATTRS.filter(attr => !Object.keys(syntypeAttrs).includes(attr));
    if (missingAttrs.length > 0) {
      return validationFailure(`syntype '${syntype}' is missing attributes: ${missingAttrs}`);
    }

    if (!(syntypeAttrs.rootable === false || syntypeAttrs.rootable === true)) {
      return validationFailure(`syntype '${syntype}' has invalid rootability: '${syntypeAttrs.rootable}'`);
    }

    if (!(syntypeAttrs.textHostRef === null || typeof syntypeAttrs.textHostRef === 'string')) {
      return validationFailure(`syntype '${syntype}' has invalid textHostRef: '${syntypeAttrs.textHostRef}'`);
    }

    Object.entries(syntypeAttrs.children).forEach(([childSyntype, childSyntypeAttrs]) => {
      if (typeof childSyntype !== 'string') {
        return validationFailure(`child relation of syntype '${syntype}' has invalid name '${childSyntype}'`);
      }

      if (typeof childSyntypeAttrs.syntype !== 'string') {
        return validationFailure(`child relation of syntype '${syntype}' has invalid syntype '${childSyntypeAttrs.syntype}'`);
      }

      if (!(childSyntypeAttrs.collection === false || childSyntypeAttrs.collection === true)) {
        return validationFailure(`child relation of syntype '${syntype}' has invalid plurality: '${childSyntypeAttrs.collection}'`);
      }
    });
  });

  return { valid: true };
};
