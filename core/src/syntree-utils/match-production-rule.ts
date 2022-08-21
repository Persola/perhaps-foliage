import forChildSynoOf from './read-node/for-child-syno-of';

import type { Syno } from '../types/syntactic/syno';
import type { ActualGrammar } from '../types/grammar/actual-grammar';
import type { ProductionRule } from '../types/grammar/production-rule';

type labelCounts = {
  [label: string]: number;
};

const setsAreEqual = (firstSet: Set<string>, secondSet: Set<string>) => {
  return (
    firstSet.size === secondSet.size
    && [...firstSet].every(label => secondSet.has(label))
  );
};

const countsAreEqual = (firstCounts: labelCounts, secondCounts: labelCounts) => {
  return (
    setsAreEqual(
      new Set(Object.keys(firstCounts)),
      new Set(Object.keys(secondCounts)),
    )
    && Object.keys(firstCounts).every(label => {
      return firstCounts[label] === secondCounts[label];
    })
  );
};

const countLabels = (labels: string[]): labelCounts => {
  const counts = {};

  for (const label of labels) {
    if (counts[label] === undefined) {
      counts[label] = 0;
    }

    counts[label] += 1;
  }

  return counts;
};

const getSynoLabels = (syno: Syno) => {
  const childEdgeLabels = [];

  forChildSynoOf(syno, (synoRef, edge) => {
    childEdgeLabels.push(edge.key);
  });

  return childEdgeLabels;
};

const getRuleLabels = (rule: ProductionRule) => {
  return rule.rhs.children.map(child => child.edgeLabel);
};

const matchExactly = (
  syno: Syno,
  rulesOfSyntype: ProductionRule[],
): ProductionRule[] => {
  return rulesOfSyntype.filter(rule => {
    const synoLabels = getSynoLabels(syno);
    const ruleLabels = getRuleLabels(rule);

    return (
      synoLabels.length === ruleLabels.length
      && synoLabels.every((label, index) => label === ruleLabels[index])
    );
  });
};

export default (
  syno: Syno,
  actualGrammar: ActualGrammar,
): ProductionRule => {
  const rulesProducingSyntype = actualGrammar.productionRules.filter(rule => {
    return rule.rhs.parent === syno.syntype;
  });

  const exactMatches = matchExactly(syno, rulesProducingSyntype);

  if (exactMatches.length > 0) {
    return exactMatches[0];
  }

  const sameCountMatches = rulesProducingSyntype.filter(rule => {
    return countsAreEqual(
      countLabels(getRuleLabels(rule)),
      countLabels(getSynoLabels(syno)),
    );
  });

  if (sameCountMatches.length > 0) {
    return sameCountMatches[0];
  }

  const sameLabelsMatches = rulesProducingSyntype.filter(rule => {
    return setsAreEqual(
      new Set(getRuleLabels(rule)),
      new Set(getSynoLabels(syno)),
    );
  });

  if (sameLabelsMatches.length > 0) {
    return sameLabelsMatches[0];
  }

  return rulesProducingSyntype[0];
};
