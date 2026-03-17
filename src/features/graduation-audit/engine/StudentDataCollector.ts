/**
 * 졸업 심사 - 학생 데이터 수집
 * KLAS 성적 조회 페이지에서 appModule.$data를 읽어 학생 정보와 수강 이력을 추출한다.
 */

import type { CourseClassification, Grade, StudentCourse, StudentData } from './types';

/**
 * 성적이 통과 상태인지 판별
 */
function isGradePassed(grade: Grade): boolean {
  return grade !== 'F' && grade !== 'NP';
}

/**
 * KLAS 페이지에서 학번 추출
 * root.js와 동일한 방식으로 학번을 파싱한다.
 * 예: "학번(20226706001)" → "20226706001"
 */
function extractStudentId(): string | null {
  try {
    const studentIdLink = (document.querySelector(
      'a[href*="/std/ads/admst/MyInfoStdPage.do"]'
    ) as HTMLAnchorElement) || null;

    if (!studentIdLink) {
      return null;
    }

    const text = studentIdLink.textContent || '';
    const match = text.match(/\((\d+)\)/);
    return match ? match[1] : null;
  }
  catch {
    return null;
  }
}

/**
 * 학번에서 입학년도와 학과코드 추출
 * 학번 형식: YYYYCCCCXXXXX
 * - YYYY: 입학년도 (처음 4자리)
 * - CCCC: 학과코드 등 (5~7번째 자리 = 학과코드)
 */
function parseStudentId(
  studentId: string
): { admissionYear: number; departmentCode: number } | null {
  if (studentId.length < 7) {
    return null;
  }

  const admissionYear = parseInt(studentId.substring(0, 4), 10);
  const departmentCode = parseInt(studentId.substring(4, 7), 10);

  if (Number.isNaN(admissionYear) || Number.isNaN(departmentCode)) {
    return null;
  }

  return { admissionYear, departmentCode };
}

/**
 * 학과코드로부터 학과명 조회
 * root.js의 colleageDB를 참고하여 구현
 */
function getDepartmentInfo(
  departmentCode: number
): { college: string; department: string } | null {
  const colleageDB: Record<number, { college: string; department: string }> = {
    706: { college: '전자정보공과대학', department: '전자공학과' },
    707: { college: '전자정보공과대학', department: '전자통신공학과' },
    742: { college: '전자정보공과대학', department: '전자융합공학과' },
    732: { college: '전자정보공과대학', department: '전기공학과' },
    734: { college: '전자정보공과대학', department: '전자재료공학과' },
    741: { college: '전자정보공과대학', department: '로봇학부' },
    202: { college: '인공지능융합대학', department: '컴퓨터정보공학부' },
    203: { college: '인공지능융합대학', department: '소프트웨어학부' },
    204: { college: '인공지능융합대학', department: '정보융합학부' },
    127: { college: '공과대학', department: '건축학과' },
    117: { college: '공과대학', department: '건축공학과' },
    114: { college: '공과대학', department: '화학공학과' },
    116: { college: '공과대학', department: '환경공학과' },
    603: { college: '자연과학대학', department: '수학과' },
    610: { college: '자연과학대학', department: '전자바이오물리학과' },
    605: { college: '자연과학대학', department: '화학과' },
    613: { college: '자연과학대학', department: '스포츠융합과학과' },
    612: { college: '자연과학대학', department: '정보콘텐츠학과' },
    304: { college: '인문사회과학대학', department: '국어국문학과' },
    322: { college: '인문사회과학대학', department: '영어산업학과' },
    323: { college: '인문사회과학대학', department: '미디어커뮤니케이션학부' },
    311: { college: '인문사회과학대학', department: '산업심리학과' },
    321: { college: '인문사회과학대학', department: '동북아문화산업학부' },
    802: { college: '정책법학대학', department: '행정학과' },
    804: { college: '정책법학대학', department: '국제학부' },
    803: { college: '정책법학대학', department: '법학부' },
    805: { college: '정책법학대학', department: '자산관리학과' },
    508: { college: '경영대학', department: '경영학부' },
    510: { college: '경영대학', department: '국제통상학부' },
  };

  return colleageDB[departmentCode] || null;
}

/**
 * appModule.$data.sungjuk에서 수강 이력 추출
 * sungjuk[i] 구조:
 * {
 *   thisYear: "2024",          // 수강년도
 *   hakgi: "1",                // 학기
 *   sungjukList: [             // 수강 과목 배열
 *     {
 *       gwamokKname: "C프로그래밍",      // 과목명
 *       codeName1: "전선",                // 이수구분
 *       hakjumNum: "3",                   // 학점
 *       getGrade: "A+ ",                  // 성적 (공백 포함)
 *       gwamokNo: "XXXXX"                 // 과목코드 (선택)
 *     }
 *   ]
 * }
 */
function extractCourses(sungjuk: any[]): StudentCourse[] {
  const courses: StudentCourse[] = [];

  if (!Array.isArray(sungjuk)) {
    return courses;
  }

  for (const semester of sungjuk) {
    if (!semester || typeof semester !== 'object') continue;

    const year = parseInt(semester.thisYear, 10);
    const sem = parseInt(semester.hakgi, 10);

    if (Number.isNaN(year) || Number.isNaN(sem)) continue;

    if (!Array.isArray(semester.sungjukList)) continue;

    for (const lectureData of semester.sungjukList) {
      if (!lectureData || typeof lectureData !== 'object') continue;

      const name = (lectureData.gwamokKname || '').trim();
      const classification = ((lectureData.codeName1 || '').trim()) as CourseClassification;
      const credits = parseInt(lectureData.hakjumNum, 10);
      const gradeStr = (lectureData.getGrade || '').trim().split(' ')[0] as Grade;
      const code = lectureData.gwamokNo ? (lectureData.gwamokNo as string).trim() : undefined;

      // 필수 필드 검증
      if (!name || !classification || Number.isNaN(credits) || !gradeStr) {
        continue;
      }

      // 성적이 유효한지 확인
      const validGrades: Grade[] = ['A+', 'A0', 'B+', 'B0', 'C+', 'C0', 'D+', 'D0', 'F', 'P', 'NP'];
      if (!validGrades.includes(gradeStr)) {
        continue;
      }

      courses.push({
        year,
        semester: sem,
        name,
        code,
        classification,
        credits,
        grade: gradeStr,
      });
    }
  }

  return courses;
}

/**
 * KLAS 성적 조회 페이지에서 학생 정보를 수집한다.
 * appModule.$data.sungjuk이 로드되어야 한다.
 */
export function collectStudentData(): StudentData | null {
  // 학번 추출
  const studentId = extractStudentId();
  if (!studentId) {
    console.warn('[GraduationAudit] Failed to extract student ID');
    return null;
  }

  // 학번 파싱
  const parsed = parseStudentId(studentId);
  if (!parsed) {
    console.warn('[GraduationAudit] Failed to parse student ID:', studentId);
    return null;
  }

  const { admissionYear, departmentCode } = parsed;

  // 학과 정보 조회
  const deptInfo = getDepartmentInfo(departmentCode);
  if (!deptInfo) {
    console.warn('[GraduationAudit] Unknown department code:', departmentCode);
    return null;
  }

  // appModule.$data.sungjuk에서 수강 이력 추출
  const appModule = (window as any).appModule;
  if (!appModule || !appModule.$data || !appModule.$data.sungjuk) {
    console.warn('[GraduationAudit] appModule.$data.sungjuk not found');
    return null;
  }

  const courses = extractCourses(appModule.$data.sungjuk);

  return {
    studentId,
    admissionYear,
    departmentCode,
    college: deptInfo.college,
    department: deptInfo.department,
    courses,
  };
}

/**
 * 학생 데이터가 로드될 때까지 대기
 * score.js의 addListenerByTimer와 유사한 패턴
 */
export function waitForStudentData(
  onSuccess: (data: StudentData) => void,
  onError: (reason: string) => void,
  maxWaitMs: number = 10000
): void {
  const startTime = Date.now();
  const interval = setInterval(() => {
    const data = collectStudentData();
    if (data) {
      clearInterval(interval);
      onSuccess(data);
      return;
    }

    if (Date.now() - startTime > maxWaitMs) {
      clearInterval(interval);
      onError('Timeout waiting for student data');
    }
  }, 100);
}
