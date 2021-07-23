const UNIVERSAL_SYNO_ATTRS = ['id', 'parent', 'syntype', 'name'];
export default ((graph, grammar) => {
  let valid = true;
  let message = '';
  Object.keys(graph).forEach(synoId => {
    const syno = graph[synoId];
    const syntype = grammar[syno.syntype];

    if (typeof syntype !== 'object') {
      valid = false;
      message += `Syntype of node (ID '${syno.id}') unrecognized. `;
    }

    if (!syno.parent && !syntype.rootable) {
      valid = false;
      message += `Graph root cannot be root because of its type '${syno.syntype}'. `;
    }

    // check for multiple roots?
    Object.keys(syno).forEach(attr => {
      if (Object.keys(syntype.children).includes(attr)) {
        if (syntype.children[attr].collection) {
          syno[attr].forEach(maybeSynoRef => {
            if (maybeSynoRef.synoRef) {
              if (graph[maybeSynoRef.id].syntype !== syntype.children[attr].syntype) {
                valid = false;
                message += `Node (ID '${maybeSynoRef.id}') invalid child. `;
              }
            }
          });
        } else if (syno[attr].synoRef) {
          if (graph[syno[attr].id].syntype !== syntype.children[attr].syntype) {
            valid = false;
            message += `Node (ID '${syno[attr].id}') invalid child. `;
          }
        }
      } else if (!UNIVERSAL_SYNO_ATTRS.includes(attr)) {
        valid = false;
        message += `Node (ID '${synoId}') has unrecognized attr '${attr}. '`;
      }
    });
  });
  return {
    valid,
    message
  };
});