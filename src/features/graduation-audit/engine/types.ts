/**
 * 졸업 심사 기능 - 모든 TypeScript 타입 정의
 */

/** 학생의 수강 이력 정보 */
export interface StudentCourse {
  year: number;                  // 수강 학년도 (e.g., 2024)
  semester: number;              // 학기 (1 또는 2)
  name: string;                  // 과목명
  code?: string;                 // 과목코드 (선택사항)
  classification: CourseClassification;  // 이수구분 (전필, 전선, 기필, 기선, 교필, 교선, 일선)
  credits: number;               // 학점
  grade: Grade;                  // 성적 (A+, A0, B+, B0, C+, C0, D+, D0, F, P, NP)
}

/** 이수구분 */
export type CourseClassification =
  | '전필'   // 전공필수
  | '전선'   // 전공선택
  | '기필'   // 기초필수
  | '기선'   // 기초선택
  | '교필'   // 교양필수
  | '교선'   // 교양선택
  | '일선';  // 일반선택

/** 성적 */
export type Grade = 'A+' | 'A0' | 'B+' | 'B0' | 'C+' | 'C0' | 'D+' | 'D0' | 'F' | 'P' | 'NP';

/** 학생 정보 */
export interface StudentData {
  studentId: string;             // 학번 (e.g., "20226706001")
  admissionYear: number;         // 입학년도 (e.g., 2022)
  departmentCode: number;        // 학과코드 (e.g., 706)
  college: string;               // 단과대명 (e.g., "전자정보공과대학")
  department: string;            // 학과명 (e.g., "전자공학과")
  courses: StudentCourse[];      // 수강 이력
}

/** 졸업 요건 규칙 */
export interface GraduationRule {
  admissionYears: number[];      // 적용 입학년도 배열 (e.g., [2024, 2025])
  college: string;
  department: string;
  programType: 'engineering' | 'general';
  totalCreditsRequired: number;  // 총 졸업학점 (e.g., 133)
  sourceNote: string;            // 규칙 출처 (e.g., "공학인증제도 안내 p.45")
  lastUpdated: string;           // 마지막 업데이트 날짜

  liberalArts: {
    mandatoryCredits: number;    // 필수교양 학점
    mandatoryCourses: string[];  // 필수교양 과목명
    balancedMinCredits: number;  // 균형교양 최소 학점
    balancedNote?: string;       // 균형교양 설명
  };

  msc: {
    minCredits: number;          // MSC(수학·기초과학·전산학) 최소 학점
    note?: string;               // 설명
    mandatoryCourses?: string[]; // 필수 과목명 (선택사항)
  };

  major: {
    totalMinCredits: number;     // 전공 최소 학점
    designMinCredits: number;    // 설계학점 최소 (e.g., 12)
    mandatoryCourseNames: string[];  // 전공필수 과목명
    mandatoryNote?: string;      // 설명
  };

  manualChecks: ManualCheckItem[];
}

/** 수동확인 항목 */
export interface ManualCheckItem {
  id: string;
  title: string;
  description: string;
}

/** 개별 요건 심사 결과 */
export interface RequirementResult {
  id: string;
  title: string;
  status: 'pass' | 'fail' | 'manual';  // pass: 충족, fail: 미충족, manual: 수동확인필요
  earned: number;               // 취득 학점/과목 수
  required: number;             // 필요 학점/과목 수
  detail: string;               // 상세 설명
  missing?: {                   // 미충족 시 부족한 항목들
    items: string[];            // 과목명 배열
    credits?: number;           // 부족 학점
  };
  sourceNote?: string;          // 규칙 출처
}

/** 전체 졸업 심사 결과 */
export interface AuditResult {
  studentId: string;
  admissionYear: number;
  college: string;
  department: string;
  appliedRule: GraduationRule | null;  // 적용된 규칙 (없으면 null)

  overallStatus: 'eligible' | 'pending' | 'ineligible' | 'unregistered';
  // eligible: 졸업 가능
  // pending: 미충족 항목 있음 (확인 필요)
  // ineligible: 졸업 불가능
  // unregistered: 규칙 미등록

  totalCredits: {
    earned: number;
    required: number;
    status: 'pass' | 'fail';
  };

  requirements: RequirementResult[];  // 각 요건별 심사 결과

  totalCompletionRate: number;  // 0~100 (%)

  remark?: string;              // 특이사항
}

/** 규칙 선택 결과 */
export interface RuleSelectionResult {
  found: boolean;
  rule: GraduationRule | null;
  reason: string;  // "Found", "No rule for this department", etc.
}
