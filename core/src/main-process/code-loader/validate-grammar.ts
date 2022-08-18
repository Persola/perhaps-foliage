import * as Ajv from 'ajv';

import invalidate from './graph-validator/invalidate';
import grammarSchema from './schemas/grammar-schema';

import type { ActualGrammar } from '../../types/grammar/actual-grammar';
import type { ValidationResult } from '../../types/code-loader/validation-result';

const grammarValidator = (actualGrammar: ActualGrammar): ValidationResult => {
  const result = {
    valid: true,
    messages: [],
  };

  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
    validateSchema: true,
  });

  const validateGrammar = ajv.compile(grammarSchema);
  if (!validateGrammar(actualGrammar)) {
    invalidate(result, validateGrammar.errors.map(e => `${e.dataPath} ${e.message}`));
    return result;
  }

  const terminalAndNonTerminalIntersection = actualGrammar.terminals.filter(symbol => {
    return actualGrammar.nonTerminals.includes(symbol);
  });
  if (terminalAndNonTerminalIntersection.length !== 0) {
    invalidate(result, (
      'Symbols may not appear in both the terminals and non-terminals lists, but these do: '
      + terminalAndNonTerminalIntersection.map(sym => `'${sym}'`).join(', ')
    ));
  }

  if (!actualGrammar.nonTerminals.includes(actualGrammar.startingNonTerminal)) {
    invalidate(result, (
      `The starting non-terminal ('${actualGrammar.startingNonTerminal}') must be`
      + ' listed among the non-terminals'
    ));
  }

  actualGrammar.productionRules.forEach((rule, ruleIndex) => {
    if (!actualGrammar.nonTerminals.includes(rule.lhs)) {
      invalidate(result, (
        `Production rule #${ruleIndex + 1} has left hand side`
        + ` '${rule.lhs}' which is impermissibly not listed among the non-terminals`
      ));
    }
    if (!actualGrammar.terminals.includes(rule.rhs.parent)) {
      invalidate(result, (
        `Production rule #${ruleIndex + 1} has right hand side parent`
        + ` '${rule.rhs.parent}' which is impermissibly not listed among the terminals`
      ));
    }
    for (const rhsChild of rule.rhs.children) {
      if (!actualGrammar.nonTerminals.includes(rhsChild.childNonTerminal)) {
        invalidate(result, (
          `Production rule #${ruleIndex + 1} has right hand side child`
          + ` with child non-terminal '${rhsChild.childNonTerminal}' which is impermissibly`
          + ' not listed among the non-terminals'
        ));
      }
    }
  });

  for (const terminal of actualGrammar.terminals) {
    const nonTerminalsProducing = actualGrammar.productionRules.filter(rule => {
      return rule.rhs.parent === terminal;
    }).map(rule => {
      return rule.lhs;
    });
    const uniqueNonTerminalsProducing = [...new Set(nonTerminalsProducing)];

    if (uniqueNonTerminalsProducing.length > 1) {
      invalidate(result, (
        `Terminal '${terminal}' is impermissibly produced by multiple non-terminals`
        + ` (${uniqueNonTerminalsProducing.map(nt => `'${nt}'`).join(', ')})`
      ));
    }
  }

  return result;
};

export default (
  actualGrammar: ActualGrammar,
  grammarName: string,
): void => {
  let grammarValidatorRez;
  try {
    grammarValidatorRez = grammarValidator(actualGrammar);
  } catch (error) {
    throw new Error(
      `Grammar validation failed with unanticipated error:\n${error.message}`,
    );
  }

  if (!grammarValidatorRez.valid) {
    throw new Error(
      `Validation of grammar '${grammarName}' failed:\n${grammarValidatorRez.messages.join('\n')}`,
    );
  }
};
