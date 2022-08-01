import validateGraph from './validate-graph';

import type { SynoMap } from '../../types/syntactic/syno-map';
import type { MainsideLanguageIntegration } from '../../types/language-integration/mainside-language-integration';

export default {
  fromString: (fileText: string, integration: MainsideLanguageIntegration): SynoMap => {
    const newSyntree = JSON.parse(fileText);
    validateGraph(
      'drug_in_file',
      newSyntree,
      integration.id,
      integration.grammar,
      integration.primitives,
    );
    return newSyntree;
  },

  fromFileObject: async (
    file: File,
    integration: MainsideLanguageIntegration,
  ): Promise<SynoMap> => {
    const fileText = await file.text();
    const newSyntree = JSON.parse(fileText);
    validateGraph(
      file.name,
      newSyntree,
      integration.id,
      integration.grammar,
      integration.primitives,
    );
    return newSyntree;
  },
};
