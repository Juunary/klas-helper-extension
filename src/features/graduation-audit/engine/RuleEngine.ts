/**
 * 졸업 심사 엔진
 * 학생 데이터와 규칙을 비교하여 졸업 가능 여부를 판정한다.
 */

import type {
  AuditResult,
  GraduationRule,
  RequirementResult,
  RuleSelectionResult,
  StudentCourse,
  StudentData,
} from './types';

/**
 * 과목명의 유사도를 계산 (포함 관계 확인)
 * 정확한 매칭을 우선하고, 부분 매칭도 고려한다.
 */
function courseNameMatch(courseName: string, targetName: string): boolean {
  const normalized1 = courseName.trim().toLowerCase();
  const normalized2 = targetName.trim().toLowerCase();

  // 정확한 매칭
  if (normalized1 === normalized2) return true;

  // 부분 매칭 (한쪽이 다른 쪽을 포함)
  if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) {
    return true;
  }

  return false;
}

/**
 * 이수구분이 MSC 영역인지 판별
 */
function isMSCClassification(classification: string): boolean {
  return classification === '기필' || classification === '기선';
}

/**
 * 이수구분이 교양인지 판별
 */
function isLiberalArtsClassification(classification: string): boolean {
  return classification === '교필' || classification === '교선';
}

/**
 * 이수구분이 전공인지 판별
 */
function isMajorClassification(classification: string): boolean {
  return classification === '전필' || classification === '전선';
}

/**
 * 학생 데이터에서 통과한 과목들만 필터링
 */
function getPassedCourses(courses: StudentCourse[]): StudentCourse[] {
  return courses.filter((course) => {
    // F 또는 NP는 제외
    if (course.grade === 'F' || course.grade === 'NP') return false;
    return true;
  });
}

/**
 * 같은 과목을 여러 번 수강한 경우 최고 성적만 선택
 * (재수강으로 이전 과목이 무효 처리되는 경우 대응)
 */
function deduplicateCoursesByName(courses: StudentCourse[]): StudentCourse[] {
  const map = new Map<string, StudentCourse>();

  // 학년도·학기순으로 정렬하여 최신 수강 기록을 우선시
  const sorted = [...courses].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.semester - a.semester;
  });

  for (const course of sorted) {
    const key = course.name.toLowerCase().trim();
    if (!map.has(key)) {
      map.set(key, course);
    }
  }

  return Array.from(map.values());
}

/**
 * 졸업 요건 규칙 로드
 * 규칙 파일은 런타임에 JSON으로 번들링되어 있다고 가정
 * (빌드 시점에 규칙 파일이 메모리에 로드됨)
 */
export class RuleRegistry {
  private rules: Map<string, GraduationRule> = new Map();

  /**
   * 규칙을 레지스트리에 등록
   */
  registerRule(rule: GraduationRule): void {
    for (const year of rule.admissionYears) {
      const key = `${rule.college}|${rule.department}|${year}`;
      this.rules.set(key, rule);
    }
  }

  /**
   * 학생에게 적용할 규칙 선택
   */
  selectRule(admissionYear: number, college: string, department: string): RuleSelectionResult {
    const key = `${college}|${department}|${admissionYear}`;
    const rule = this.rules.get(key);

    if (rule) {
      return { found: true, rule, reason: 'Found' };
    }

    // 규칙을 찾지 못한 경우
    return {
      found: false,
      rule: null,
      reason: `No rule registered for ${college} ${department} (admission year ${admissionYear})`,
    };
  }

  /**
   * 현재 등록된 모든 규칙 반환 (디버깅용)
   */
  getAllRules(): GraduationRule[] {
    return Array.from(this.rules.values());
  }
}

/**
 * 졸업 심사 엔진
 */
export class GraduationAuditEngine {
  private ruleRegistry: RuleRegistry;

  constructor(ruleRegistry: RuleRegistry) {
    this.ruleRegistry = ruleRegistry;
  }

  /**
   * 총 졸업학점 심사
   */
  private checkTotalCredits(courses: StudentCourse[], rule: GraduationRule): RequirementResult {
    const passedCourses = getPassedCourses(courses);
    const earned = passedCourses.reduce((sum, course) => sum + course.credits, 0);
    const required = rule.totalCreditsRequired;

    return {
      id: 'total_credits',
      title: '총 졸업학점',
      status: earned >= required ? 'pass' : 'fail',
      earned,
      required,
      detail: `${earned}학점 / ${required}학점`,
      sourceNote: rule.sourceNote,
    };
  }

  /**
   * 전공학점 심사
   */
  private checkMajorCredits(courses: StudentCourse[], rule: GraduationRule): RequirementResult {
    const majorCourses = getPassedCourses(courses).filter((c) => isMajorClassification(c.classification));

    const earned = majorCourses.reduce((sum, course) => sum + course.credits, 0);
    const required = rule.major.totalMinCredits;

    return {
      id: 'major_credits',
      title: '전공학점',
      status: earned >= required ? 'pass' : 'fail',
      earned,
      required,
      detail: `${earned}학점 / ${required}학점`,
      sourceNote: rule.sourceNote,
    };
  }

  /**
   * 설계학점 심사
   */
  private checkDesignCredits(courses: StudentCourse[], rule: GraduationRule): RequirementResult {
    const designCourses = getPassedCourses(courses).filter((c) => {
      // 과목명에 '설계'나 '캡스톤'이 포함된 경우 설계학점으로 판정
      const name = c.name.toLowerCase();
      return name.includes('설계') || name.includes('capstone') || name.includes('캡스톤');
    });

    const earned = designCourses.reduce((sum, course) => sum + course.credits, 0);
    const required = rule.major.designMinCredits;

    return {
      id: 'design_credits',
      title: '설계학점 (전공 설계 12학점 이상)',
      status: earned >= required ? 'pass' : 'fail',
      earned,
      required,
      detail: `${earned}학점 / ${required}학점`,
      sourceNote: rule.sourceNote,
    };
  }

  /**
   * MSC(수학·기초과학·전산학) 학점 심사
   */
  private checkMSCCredits(courses: StudentCourse[], rule: GraduationRule): RequirementResult {
    const mscCourses = getPassedCourses(courses).filter((c) => isMSCClassification(c.classification));

    const earned = mscCourses.reduce((sum, course) => sum + course.credits, 0);
    const required = rule.msc.minCredits;

    const missing =
      earned < required
        ? {
            items: rule.msc.mandatoryCourses
              ? rule.msc.mandatoryCourses.filter((name) => {
                return !mscCourses.some((c) => courseNameMatch(c.name, name));
              })
              : [],
            credits: required - earned,
          }
        : undefined;

    return {
      id: 'msc_credits',
      title: `MSC(수학·기초과학·전산학) - ${required}학점 이상`,
      status: earned >= required ? 'pass' : 'fail',
      earned,
      required,
      detail: `${earned}학점 / ${required}학점`,
      missing,
      sourceNote: rule.sourceNote,
    };
  }

  /**
   * 교양필수 과목 심사
   */
  private checkLiberalArtsMandatory(courses: StudentCourse[], rule: GraduationRule): RequirementResult {
    const mandatoryCourses = rule.liberalArts.mandatoryCourses;
    const passed = getPassedCourses(courses);

    const completed = mandatoryCourses.filter((required) => passed.some((c) => courseNameMatch(c.name, required)));

    const missing = mandatoryCourses.filter((required) => !passed.some((c) => courseNameMatch(c.name, required)));

    return {
      id: 'liberal_arts_mandatory',
      title: '교양필수',
      status: missing.length === 0 ? 'pass' : 'fail',
      earned: completed.length,
      required: mandatoryCourses.length,
      detail:
        missing.length === 0
          ? '이수 완료'
          : `부족: ${missing.join(', ')}`,
      missing: missing.length > 0 ? { items: missing } : undefined,
      sourceNote: rule.sourceNote,
    };
  }

  /**
   * 균형교양 학점 심사
   */
  private checkLiberalArtsBalanced(courses: StudentCourse[], rule: GraduationRule): RequirementResult {
    const liberalArtsCourses = getPassedCourses(courses).filter((c) => isLiberalArtsClassification(c.classification));

    const earned = liberalArtsCourses.reduce((sum, course) => sum + course.credits, 0);
    const required = rule.liberalArts.balancedMinCredits;

    return {
      id: 'liberal_arts_balanced',
      title: '균형교양',
      status: earned >= required ? 'pass' : 'manual',
      earned,
      required,
      detail: `${earned}학점 / ${required}학점 (영역별 분포는 수동 확인 필요)`,
      sourceNote: rule.sourceNote,
    };
  }

  /**
   * 전공필수 과목 심사
   */
  private checkMandatoryCourses(
    courses: StudentCourse[],
    mandatoryCourseNames: string[]
  ): RequirementResult {
    const passed = getPassedCourses(courses);

    const completed = mandatoryCourseNames.filter((required) => passed.some((c) => courseNameMatch(c.name, required)));

    const missing = mandatoryCourseNames.filter((required) => !passed.some((c) => courseNameMatch(c.name, required)));

    return {
      id: 'mandatory_courses',
      title: '전공필수 과목',
      status: missing.length === 0 ? 'pass' : 'fail',
      earned: completed.length,
      required: mandatoryCourseNames.length,
      detail:
        missing.length === 0
          ? '이수 완료'
          : `부족: ${missing.join(', ')}`,
      missing: missing.length > 0 ? { items: missing } : undefined,
    };
  }

  /**
   * 학생 졸업 심사 실행
   */
  audit(studentData: StudentData, rule: GraduationRule): AuditResult {
    const deduplicated = deduplicateCoursesByName(studentData.courses);

    const requirements: RequirementResult[] = [
      this.checkTotalCredits(deduplicated, rule),
      this.checkMajorCredits(deduplicated, rule),
      this.checkDesignCredits(deduplicated, rule),
      this.checkMSCCredits(deduplicated, rule),
      this.checkLiberalArtsMandatory(deduplicated, rule),
      this.checkLiberalArtsBalanced(deduplicated, rule),
      this.checkMandatoryCourses(deduplicated, rule.major.mandatoryCourseNames),
    ];

    // 총 진행률 계산 (통과 항목 수 / 전체 항목 수)
    const passCount = requirements.filter((r) => r.status === 'pass').length;
    const totalCompletionRate = Math.round((passCount / requirements.length) * 100);

    // 전체 상태 결정
    const failCount = requirements.filter((r) => r.status === 'fail').length;
    const manualCount = requirements.filter((r) => r.status === 'manual').length;

    let overallStatus: AuditResult['overallStatus'];
    if (failCount === 0 && manualCount === 0) {
      overallStatus = 'eligible';
    }
    else if (failCount === 0 && manualCount > 0) {
      overallStatus = 'pending';
    }
    else {
      overallStatus = 'ineligible';
    }

    const totalCreditsReq = requirements.find((r) => r.id === 'total_credits');
    const totalCredits = totalCreditsReq
      ? { earned: totalCreditsReq.earned, required: totalCreditsReq.required, status: totalCreditsReq.status as 'pass' | 'fail' }
      : { earned: 0, required: rule.totalCreditsRequired, status: 'fail' as const };

    return {
      studentId: studentData.studentId,
      admissionYear: studentData.admissionYear,
      college: studentData.college,
      department: studentData.department,
      appliedRule: rule,
      overallStatus,
      totalCredits,
      requirements,
      totalCompletionRate,
      remark:
        manualCount > 0
          ? `${manualCount}개 항목이 수동 확인 필요합니다.`
          : undefined,
    };
  }

  /**
   * 학생에게 적용할 규칙을 선택하고 심사 실행
   */
  auditStudent(studentData: StudentData): AuditResult {
    const selection = this.ruleRegistry.selectRule(
      studentData.admissionYear,
      studentData.college,
      studentData.department
    );

    if (!selection.found || !selection.rule) {
      // 규칙이 없는 경우
      return {
        studentId: studentData.studentId,
        admissionYear: studentData.admissionYear,
        college: studentData.college,
        department: studentData.department,
        appliedRule: null,
        overallStatus: 'unregistered',
        totalCredits: {
          earned: 0,
          required: 0,
          status: 'fail',
        },
        requirements: [],
        totalCompletionRate: 0,
        remark: `${studentData.college} ${studentData.department}의 규정이 아직 등록되지 않았습니다. 수동으로 확인하시기 바랍니다.`,
      };
    }

    return this.audit(studentData, selection.rule);
  }
}
