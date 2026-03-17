/**
 * 졸업 요건 규칙 파일의 JSON 스키마 검증
 */

import type { GraduationRule } from '../engine/types';

/**
 * GraduationRule 객체의 필수 필드와 타입을 검증한다.
 * 개발 시점에 규칙 파일의 오류를 조기에 발견할 수 있다.
 */
export function validateGraduationRule(obj: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!obj || typeof obj !== 'object') {
    return { valid: false, errors: ['Rule must be an object'] };
  }

  const rule = obj as Record<string, unknown>;

  // 필수 필드 검증
  const requiredFields = [
    'admissionYears',
    'college',
    'department',
    'programType',
    'totalCreditsRequired',
    'sourceNote',
    'lastUpdated',
    'liberalArts',
    'msc',
    'major',
    'manualChecks',
  ];

  for (const field of requiredFields) {
    if (!(field in rule)) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // 타입 검증
  if (!Array.isArray(rule.admissionYears)) {
    errors.push('admissionYears must be an array of numbers');
  }

  if (typeof rule.college !== 'string') {
    errors.push('college must be a string');
  }

  if (typeof rule.department !== 'string') {
    errors.push('department must be a string');
  }

  if (rule.programType !== 'engineering' && rule.programType !== 'general') {
    errors.push("programType must be 'engineering' or 'general'");
  }

  if (typeof rule.totalCreditsRequired !== 'number') {
    errors.push('totalCreditsRequired must be a number');
  }

  if (typeof rule.sourceNote !== 'string') {
    errors.push('sourceNote must be a string');
  }

  if (typeof rule.lastUpdated !== 'string') {
    errors.push('lastUpdated must be a string (YYYY-MM-DD)');
  }

  // liberalArts 검증
  if (typeof rule.liberalArts !== 'object' || rule.liberalArts === null) {
    errors.push('liberalArts must be an object');
  }
  else {
    const la = rule.liberalArts as Record<string, unknown>;
    if (typeof la.mandatoryCredits !== 'number') {
      errors.push('liberalArts.mandatoryCredits must be a number');
    }
    if (!Array.isArray(la.mandatoryCourses)) {
      errors.push('liberalArts.mandatoryCourses must be an array of strings');
    }
    if (typeof la.balancedMinCredits !== 'number') {
      errors.push('liberalArts.balancedMinCredits must be a number');
    }
  }

  // msc 검증
  if (typeof rule.msc !== 'object' || rule.msc === null) {
    errors.push('msc must be an object');
  }
  else {
    const msc = rule.msc as Record<string, unknown>;
    if (typeof msc.minCredits !== 'number') {
      errors.push('msc.minCredits must be a number');
    }
  }

  // major 검증
  if (typeof rule.major !== 'object' || rule.major === null) {
    errors.push('major must be an object');
  }
  else {
    const major = rule.major as Record<string, unknown>;
    if (typeof major.totalMinCredits !== 'number') {
      errors.push('major.totalMinCredits must be a number');
    }
    if (typeof major.designMinCredits !== 'number') {
      errors.push('major.designMinCredits must be a number');
    }
    if (!Array.isArray(major.mandatoryCourseNames)) {
      errors.push('major.mandatoryCourseNames must be an array of strings');
    }
  }

  // manualChecks 검증
  if (!Array.isArray(rule.manualChecks)) {
    errors.push('manualChecks must be an array');
  }
  else {
    const checks = rule.manualChecks as Record<string, unknown>[];
    for (let i = 0; i < checks.length; i++) {
      const check = checks[i];
      if (typeof check?.id !== 'string') {
        errors.push(`manualChecks[${i}].id must be a string`);
      }
      if (typeof check?.title !== 'string') {
        errors.push(`manualChecks[${i}].title must be a string`);
      }
      if (typeof check?.description !== 'string') {
        errors.push(`manualChecks[${i}].description must be a string`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * 규칙 파일 로드 및 검증
 */
export async function loadAndValidateRule(ruleContent: string): Promise<{
  success: boolean;
  rule: GraduationRule | null;
  errors: string[];
}> {
  try {
    const rule = JSON.parse(ruleContent) as unknown;
    const validation = validateGraduationRule(rule);

    if (!validation.valid) {
      return {
        success: false,
        rule: null,
        errors: validation.errors,
      };
    }

    return {
      success: true,
      rule: rule as GraduationRule,
      errors: [],
    };
  }
  catch (e) {
    return {
      success: false,
      rule: null,
      errors: [e instanceof Error ? e.message : 'Unknown error parsing JSON'],
    };
  }
}
