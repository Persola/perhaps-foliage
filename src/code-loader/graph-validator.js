const UNIVERSAL_SYNO_ATTRS = [
  'id',
  'parent',
  'syntype',
  'name',
];

export default (graph, grammar) => {
  Object.keys(graph).forEach(synoId => {
    const syno = graph[synoId];
    const syntype = grammar[syno.syntype];
    if (typeof syntype !== 'object') {
      return {
        valid: false,
        message: `syntype of node (ID '${syno.id}') unrecognized`,
      };
    }
    if (syno.parent === false && !syntype.rootable) {
      return {
        valid: false,
        message: 'Graph root is wrong type',
      };
    }
    // check for multiple roots?
    Object.keys(syno).forEach(attr => {
      if (Object.keys(syntype.children).includes(attr)) {
        if (syntype.children[attr].collection) {
          syno[attr].forEach(maybeSynoRef => {
            if (maybeSynoRef.synoRef) {
              if (graph[maybeSynoRef.id].syntype !== syntype.children[attr].syntype) {
                return {
                  valid: false,
                  message: `node (ID '${maybeSynoRef.id}') invalid child`,
                };
              }
            }
          });
        } else if (syno[attr].synoRef) {
          if (graph[syno[attr].id].syntype !== syntype.children[attr].syntype) {
            return {
              valid: false,
              message: `node (ID '${syno[attr].id}') invalid child`,
            };
          }
        }
      } else if (!UNIVERSAL_SYNO_ATTRS.includes(attr)) {
        return {
          valid: false,
          message: `node (ID '${synoId}') has unrecognized attr '${attr}'`,
        };
      }
    });
  });

  return { valid: true };
};
