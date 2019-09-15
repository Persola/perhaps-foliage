const SYNTYPE_ATTRS = [
  'rootable',
  'children'
]

export default (grammar) => {
  for (let [syntype, syntypeAttrs] of Object.entries(grammar)) {
    if (typeof syntype !== 'string') {
      return {
        valid: false,
        message: `syntype '${syntype}' has invalid name`
      };
    }

    const invalidAttrs = Object.keys(syntypeAttrs).filter(attr => !SYNTYPE_ATTRS.includes(attr));
    if (invalidAttrs.length > 0) {
      return {
        valid: false,
        message: `syntype '${syntype}' has invalid attributes: ${invalidAttrs}`
      };
    }
    const missingAttrs = SYNTYPE_ATTRS.filter(attr => !Object.keys(syntypeAttrs).includes(attr));
    if (missingAttrs.length > 0) {
      return {
        valid: false,
        message: `syntype '${syntype}' is missing attributes: ${missingAttrs}`
      };
    }
  
    if (!(syntypeAttrs.rootable === false || syntypeAttrs.rootable === true)) {
      return {
        valid: false,
        message: `syntype '${syntype}' has invalid rootability: '${syntypeAttrs.rootable}'`
      };
    }
    for (let [childSyntype, childSyntypeAttrs] of Object.entries(syntypeAttrs.children)) {
      if (typeof childSyntype !== 'string') {
        return {
          valid: false,
          message: `child relation of syntype '${syntype}' has invalid name '${childSyntype}'`
        };
      }
      if (typeof childSyntypeAttrs.syntype !== 'string') {
        return {
          valid: false,
          message: `child relation of syntype '${syntype}' has invalid syntype '${childSyntypeAttrs.syntype}'`
        };
      }
      if (!(childSyntypeAttrs.collection === false || childSyntypeAttrs.collection === true)) {
        return {
          valid: false,
          message: `child relation of syntype '${syntype}' has invalid plurality: '${childSyntypeAttrs.collection}'`
        };
      }
    }
  }

  return { valid: true };
};
