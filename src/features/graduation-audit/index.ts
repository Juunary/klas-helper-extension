/**
 * 졸업 심사 기능 진입점
 */

export { GraduationAuditEngine, RuleRegistry } from './engine/RuleEngine';
export { collectStudentData, waitForStudentData } from './engine/StudentDataCollector';
export type {
  AuditResult,
  GraduationRule,
  RequirementResult,
  RuleSelectionResult,
  StudentCourse,
  StudentData,
} from './engine/types';
export { default as GraduationAudit } from './ui/GraduationAudit';
