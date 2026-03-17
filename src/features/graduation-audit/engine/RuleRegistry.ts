/**
 * 졸업 요건 규칙 레지스트리
 * 모든 규칙을 등록하는 팩토리 함수
 */

import { RuleRegistry } from './RuleEngine';
import type { GraduationRule } from './types';

// 규칙들을 TypeScript 상수로 정의 (import 대신)
// 각 규칙 파일의 내용을 직접 포함

const rule_전자공학과_2024_2025: GraduationRule = {
  admissionYears: [2024, 2025],
  college: '전자정보공과대학',
  department: '전자공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '공학인증제도 안내 p.45, 졸업이수학점 p.18-19',
  lastUpdated: '2025-03-17',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 30,
    balancedNote: '8개 영역 중 4개 영역 이상에서 각 10과목×3학점',
  },
  msc: {
    minCredits: 24,
    note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수',
    mandatoryCourses: [
      '대학수학및연습1',
      '대학수학및연습2',
      '공학수학1',
      '확률및통계',
      '대학물리1',
      '대학물리실험1',
      'C프로그래밍',
      'C프로그래밍응용',
    ],
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: ['공학설계입문', '캡스톤설계'],
    mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조',
  },
  manualChecks: [
    {
      id: 'engineering_program',
      title: '공학프로그램 이수 여부',
      description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요',
    },
    {
      id: 'double_major',
      title: '복수전공/부전공 중복학점',
      description: '복수전공·부전공 이수 시 주전공과의 중복 인정 제한이 있으니 학과 확인 필요',
    },
  ],
};

const rule_전자통신공학과_2024_2025: GraduationRule = {
  admissionYears: [2024, 2025],
  college: '전자정보공과대학',
  department: '전자통신공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '공학인증제도 안내 p.46, 졸업이수학점 p.19',
  lastUpdated: '2025-03-17',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 30,
    balancedNote: '8개 영역 중 4개 영역 이상에서 각 10과목×3학점',
  },
  msc: {
    minCredits: 24,
    note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수',
    mandatoryCourses: [
      '대학수학및연습1',
      '공학수학1',
      '확률및통계',
      '대학물리1',
    ],
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: ['공학설계입문', '예비캡스톤설계', '캡스톤설계'],
    mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조',
  },
  manualChecks: [
    {
      id: 'engineering_program',
      title: '공학프로그램 이수 여부',
      description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요',
    },
  ],
};

const rule_컴퓨터정보공학부_2024_2025: GraduationRule = {
  admissionYears: [2024, 2025],
  college: '인공지능융합대학',
  department: '컴퓨터정보공학부',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '공학인증제도 안내 p.50, 졸업이수학점 p.52',
  lastUpdated: '2025-03-17',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 30,
    balancedNote: '8개 영역 중 4개 영역 이상에서 각 10과목×3학점',
  },
  msc: {
    minCredits: 27,
    note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수',
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: ['공학설계입문', '수치해석', '산학협력캡스톤설계'],
    mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조',
  },
  manualChecks: [
    {
      id: 'engineering_program',
      title: '공학프로그램 이수 여부',
      description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요',
    },
  ],
};

const rule_소프트웨어학부_2024_2025: GraduationRule = {
  admissionYears: [2024, 2025],
  college: '인공지능융합대학',
  department: '소프트웨어학부',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '공학인증제도 안내 p.50, 졸업이수학점 p.53',
  lastUpdated: '2025-03-17',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 30,
    balancedNote: '8개 영역 중 4개 영역 이상에서 각 10과목×3학점',
  },
  msc: {
    minCredits: 12,
    note: '수학 최소 6학점, 기초과학 최소 3학점 포함',
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: [
      '공학설계입문',
      '이산수학',
      '산학협력캡스톤설계1',
      '산학협력캡스톤설계2',
    ],
    mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조',
  },
  manualChecks: [
    {
      id: 'engineering_program',
      title: '공학프로그램 이수 여부',
      description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요',
    },
  ],
};

const rule_전자융합공학과_2024_2025: GraduationRule = {
  admissionYears: [2024, 2025],
  college: '전자정보공과대학',
  department: '전자융합공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '공학인증제도 안내 p.47, 졸업이수학점 p.20',
  lastUpdated: '2025-03-17',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 30,
    balancedNote: '8개 영역 중 4개 영역 이상에서 각 10과목×3학점',
  },
  msc: {
    minCredits: 27,
    note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수',
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: ['공학설계입문', '캡스톤설계1'],
    mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조',
  },
  manualChecks: [
    {
      id: 'engineering_program',
      title: '공학프로그램 이수 여부',
      description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요',
    },
  ],
};

const rule_전기공학과_2024_2025: GraduationRule = {
  admissionYears: [2024, 2025],
  college: '전자정보공과대학',
  department: '전기공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '공학인증제도 안내 p.48, 졸업이수학점 p.21',
  lastUpdated: '2025-03-17',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 30,
    balancedNote: '8개 영역 중 4개 영역 이상에서 각 10과목×3학점',
  },
  msc: {
    minCredits: 30,
    note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수',
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: ['공학설계입문', '캡스톤설계'],
    mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조',
  },
  manualChecks: [
    {
      id: 'engineering_program',
      title: '공학프로그램 이수 여부',
      description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요',
    },
  ],
};

const rule_전자재료공학과_2024_2025: GraduationRule = {
  admissionYears: [2024, 2025],
  college: '전자정보공과대학',
  department: '전자재료공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '공학인증제도 안내 p.49, 졸업이수학점 p.21',
  lastUpdated: '2025-03-17',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 30,
    balancedNote: '8개 영역 중 4개 영역 이상에서 각 10과목×3학점',
  },
  msc: {
    minCredits: 27,
    note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수',
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: ['공학설계입문', '캡스톤설계1', '캡스톤설계2'],
    mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조',
  },
  manualChecks: [
    {
      id: 'engineering_program',
      title: '공학프로그램 이수 여부',
      description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요',
    },
  ],
};

const rule_로봇학부_2024_2025: GraduationRule = {
  admissionYears: [2024, 2025],
  college: '전자정보공과대학',
  department: '로봇학부',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '공학인증제도 안내 p.49, 졸업이수학점 p.22',
  lastUpdated: '2025-03-17',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 30,
    balancedNote: '8개 영역 중 4개 영역 이상에서 각 10과목×3학점',
  },
  msc: {
    minCredits: 30,
    note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수',
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: ['로봇학입문', '캡스톤설계'],
    mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조',
  },
  manualChecks: [
    {
      id: 'engineering_program',
      title: '공학프로그램 이수 여부',
      description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요',
    },
  ],
};

const rule_건축공학과_2024_2025: GraduationRule = {
  admissionYears: [2024, 2025],
  college: '공과대학',
  department: '건축공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '공학인증제도 안내 p.51, 졸업이수학점 p.36',
  lastUpdated: '2025-03-17',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 30,
    balancedNote: '8개 영역 중 4개 영역 이상에서 각 10과목×3학점',
  },
  msc: {
    minCredits: 24,
    note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수',
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: ['공학설계입문'],
    mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조',
  },
  manualChecks: [
    {
      id: 'engineering_program',
      title: '공학프로그램 이수 여부',
      description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요',
    },
  ],
};

const rule_화학공학과_2024_2025: GraduationRule = {
  admissionYears: [2024, 2025],
  college: '공과대학',
  department: '화학공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '공학인증제도 안내 p.51, 졸업이수학점 p.36-37',
  lastUpdated: '2025-03-17',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 30,
    balancedNote: '8개 영역 중 4개 영역 이상에서 각 10과목×3학점',
  },
  msc: {
    minCredits: 27,
    note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수',
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: ['공학설계입문', '캡스톤설계심화'],
    mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조',
  },
  manualChecks: [
    {
      id: 'engineering_program',
      title: '공학프로그램 이수 여부',
      description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요',
    },
  ],
};

const rule_환경공학과_2024_2025: GraduationRule = {
  admissionYears: [2024, 2025],
  college: '공과대학',
  department: '환경공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '공학인증제도 안내 p.52, 졸업이수학점 p.37-38',
  lastUpdated: '2025-03-17',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 30,
    balancedNote: '8개 영역 중 4개 영역 이상에서 각 10과목×3학점',
  },
  msc: {
    minCredits: 24,
    note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수',
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: [
      '공학설계입문',
      '캡스톤설계',
      '환경기초실험',
      '환경공정실험',
      '환경반응공학',
    ],
    mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조',
  },
  manualChecks: [
    {
      id: 'engineering_program',
      title: '공학프로그램 이수 여부',
      description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요',
    },
  ],
};

// ─── 2020-2023학번 규칙 ───────────────────────────────────────────────────────
// 공통: 총 133학점, 균형교양 21학점(7과목), 광운인되기 1학점 필수, 전공 60학점(설계 12학점)

const rule_전자공학과_2020_2023: GraduationRule = {
  admissionYears: [2020, 2021, 2022, 2023],
  college: '전자정보공과대학',
  department: '전자공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 p.18-19 (2020-2023학번)',
  lastUpdated: '2025-03-18',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 21,
    balancedNote: '7영역 7과목×3학점=21학점',
  },
  msc: {
    minCredits: 30,
    note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수',
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: ['공학설계입문', '캡스톤설계'],
    mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조',
  },
  manualChecks: [
    { id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' },
  ],
};

const rule_전자통신공학과_2020_2023: GraduationRule = {
  admissionYears: [2020, 2021, 2022, 2023],
  college: '전자정보공과대학',
  department: '전자통신공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 p.19 (2020-2023학번)',
  lastUpdated: '2025-03-18',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 21,
    balancedNote: '7영역 7과목×3학점=21학점',
  },
  msc: {
    minCredits: 30,
    note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수',
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: ['공학설계입문', '예비캡스톤설계', '캡스톤설계'],
    mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조',
  },
  manualChecks: [
    { id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' },
  ],
};

const rule_전자융합공학과_2020_2023: GraduationRule = {
  admissionYears: [2020, 2021, 2022, 2023],
  college: '전자정보공과대학',
  department: '전자융합공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 p.20 (2020-2023학번)',
  lastUpdated: '2025-03-18',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 21,
    balancedNote: '7영역 7과목×3학점=21학점',
  },
  msc: {
    minCredits: 30,
    note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수',
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: ['공학설계입문', '캡스톤설계1'],
    mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조',
  },
  manualChecks: [
    { id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' },
  ],
};

const rule_전기공학과_2020_2023: GraduationRule = {
  admissionYears: [2020, 2021, 2022, 2023],
  college: '전자정보공과대학',
  department: '전기공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 p.21 (2020-2023학번)',
  lastUpdated: '2025-03-18',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 21,
    balancedNote: '7영역 7과목×3학점=21학점',
  },
  msc: {
    minCredits: 30,
    note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수',
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: ['공학설계입문', '캡스톤설계'],
    mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조',
  },
  manualChecks: [
    { id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' },
  ],
};

const rule_전자재료공학과_2020_2023: GraduationRule = {
  admissionYears: [2020, 2021, 2022, 2023],
  college: '전자정보공과대학',
  department: '전자재료공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 p.21 (2020-2023학번)',
  lastUpdated: '2025-03-18',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 21,
    balancedNote: '7영역 7과목×3학점=21학점',
  },
  msc: {
    minCredits: 30,
    note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수',
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: ['공학설계입문', '캡스톤설계1', '캡스톤설계2'],
    mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조',
  },
  manualChecks: [
    { id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' },
  ],
};

const rule_로봇학부_2020_2023: GraduationRule = {
  admissionYears: [2020, 2021, 2022, 2023],
  college: '전자정보공과대학',
  department: '로봇학부',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 p.22 (2020-2023학번)',
  lastUpdated: '2025-03-18',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 21,
    balancedNote: '7영역 7과목×3학점=21학점',
  },
  msc: {
    minCredits: 30,
    note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수',
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: ['로봇학입문', '캡스톤설계'],
    mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조',
  },
  manualChecks: [
    { id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' },
  ],
};

const rule_컴퓨터정보공학부_2020_2023: GraduationRule = {
  admissionYears: [2020, 2021, 2022, 2023],
  college: '인공지능융합대학',
  department: '컴퓨터정보공학부',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 p.52 (2020-2023학번)',
  lastUpdated: '2025-03-18',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 21,
    balancedNote: '7영역 7과목×3학점=21학점',
  },
  msc: {
    minCredits: 30,
    note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수',
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: ['공학설계입문', '수치해석', '산학협력캡스톤설계'],
    mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조',
  },
  manualChecks: [
    { id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' },
  ],
};

const rule_소프트웨어학부_2020_2023: GraduationRule = {
  admissionYears: [2020, 2021, 2022, 2023],
  college: '인공지능융합대학',
  department: '소프트웨어학부',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 p.53 (2020-2023학번)',
  lastUpdated: '2025-03-18',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 21,
    balancedNote: '7영역 7과목×3학점=21학점',
  },
  msc: {
    minCredits: 12,
    note: '수학 최소 6학점, 기초과학 최소 3학점 포함하여 총 12학점 이상',
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: ['공학설계입문', '이산수학', '산학협력캡스톤설계1', '산학협력캡스톤설계2'],
    mandatoryNote: '산학협력캡스톤설계1 또는 2 중 1과목 이상 이수 필요',
  },
  manualChecks: [
    { id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' },
  ],
};

const rule_건축공학과_2020_2023: GraduationRule = {
  admissionYears: [2020, 2021, 2022, 2023],
  college: '공과대학',
  department: '건축공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 p.36 (2020-2023학번)',
  lastUpdated: '2025-03-18',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 21,
    balancedNote: '7영역 7과목×3학점=21학점',
  },
  msc: {
    minCredits: 30,
    note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수',
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 9,
    mandatoryCourseNames: ['공학설계입문'],
    mandatoryNote: '건축공학과 설계학점은 9학점',
  },
  manualChecks: [
    { id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' },
  ],
};

const rule_화학공학과_2020_2023: GraduationRule = {
  admissionYears: [2020, 2021, 2022, 2023],
  college: '공과대학',
  department: '화학공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 p.36-37 (2020-2023학번)',
  lastUpdated: '2025-03-18',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 21,
    balancedNote: '7영역 7과목×3학점=21학점',
  },
  msc: {
    minCredits: 30,
    note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수',
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: ['공학설계입문', '캡스톤설계심화'],
    mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조',
  },
  manualChecks: [
    { id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' },
  ],
};

const rule_환경공학과_2020_2023: GraduationRule = {
  admissionYears: [2020, 2021, 2022, 2023],
  college: '공과대학',
  department: '환경공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 p.37-38 (2020-2023학번)',
  lastUpdated: '2025-03-18',
  liberalArts: {
    mandatoryCredits: 1,
    mandatoryCourses: ['광운인되기'],
    balancedMinCredits: 21,
    balancedNote: '7영역 7과목×3학점=21학점',
  },
  msc: {
    minCredits: 30,
    note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수',
  },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: ['공학설계입문', '캡스톤설계', '환경기초실험', '환경공정실험', '환경반응공학'],
    mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조',
  },
  manualChecks: [
    { id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' },
  ],
};

// ─── 2017-2019학번 규칙 ───────────────────────────────────────────────────────
// 공통: 총 133학점, 균형교양 21학점(7과목), 광운인되기 미이수 가능(폐지), 전공 60학점(설계 12학점)

const rule_전자공학과_2017_2019: GraduationRule = {
  admissionYears: [2017, 2018, 2019],
  college: '전자정보공과대학',
  department: '전자공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 (2017-2019학번)',
  lastUpdated: '2025-03-18',
  liberalArts: {
    mandatoryCredits: 0,
    mandatoryCourses: [],
    balancedMinCredits: 21,
    balancedNote: '7영역 7과목×3학점=21학점 (광운인되기 2017-2019학번 미이수 가능)',
  },
  msc: { minCredits: 30, note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수' },
  major: { totalMinCredits: 60, designMinCredits: 12, mandatoryCourseNames: ['공학설계입문', '캡스톤설계'], mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조' },
  manualChecks: [{ id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' }],
};

const rule_전자통신공학과_2017_2019: GraduationRule = {
  admissionYears: [2017, 2018, 2019],
  college: '전자정보공과대학',
  department: '전자통신공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 (2017-2019학번)',
  lastUpdated: '2025-03-18',
  liberalArts: { mandatoryCredits: 0, mandatoryCourses: [], balancedMinCredits: 21, balancedNote: '7영역 7과목×3학점=21학점' },
  msc: { minCredits: 30, note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수' },
  major: { totalMinCredits: 60, designMinCredits: 12, mandatoryCourseNames: ['공학설계입문', '예비캡스톤설계', '캡스톤설계'], mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조' },
  manualChecks: [{ id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' }],
};

const rule_전자융합공학과_2017_2019: GraduationRule = {
  admissionYears: [2017, 2018, 2019],
  college: '전자정보공과대학',
  department: '전자융합공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 (2017-2019학번)',
  lastUpdated: '2025-03-18',
  liberalArts: { mandatoryCredits: 0, mandatoryCourses: [], balancedMinCredits: 21, balancedNote: '7영역 7과목×3학점=21학점' },
  msc: { minCredits: 30, note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수' },
  major: { totalMinCredits: 60, designMinCredits: 12, mandatoryCourseNames: ['공학설계입문', '캡스톤설계1'], mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조' },
  manualChecks: [{ id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' }],
};

const rule_전기공학과_2017_2019: GraduationRule = {
  admissionYears: [2017, 2018, 2019],
  college: '전자정보공과대학',
  department: '전기공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 (2017-2019학번)',
  lastUpdated: '2025-03-18',
  liberalArts: { mandatoryCredits: 0, mandatoryCourses: [], balancedMinCredits: 21, balancedNote: '7영역 7과목×3학점=21학점' },
  msc: { minCredits: 30, note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수' },
  major: { totalMinCredits: 60, designMinCredits: 12, mandatoryCourseNames: ['공학설계입문', '캡스톤설계'], mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조' },
  manualChecks: [{ id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' }],
};

const rule_전자재료공학과_2017_2019: GraduationRule = {
  admissionYears: [2017, 2018, 2019],
  college: '전자정보공과대학',
  department: '전자재료공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 (2017-2019학번)',
  lastUpdated: '2025-03-18',
  liberalArts: { mandatoryCredits: 0, mandatoryCourses: [], balancedMinCredits: 21, balancedNote: '7영역 7과목×3학점=21학점' },
  msc: { minCredits: 30, note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수' },
  major: { totalMinCredits: 60, designMinCredits: 12, mandatoryCourseNames: ['공학설계입문', '캡스톤설계1', '캡스톤설계2'], mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조' },
  manualChecks: [{ id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' }],
};

const rule_로봇학부_2017_2019: GraduationRule = {
  admissionYears: [2017, 2018, 2019],
  college: '전자정보공과대학',
  department: '로봇학부',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 (2017-2019학번)',
  lastUpdated: '2025-03-18',
  liberalArts: { mandatoryCredits: 0, mandatoryCourses: [], balancedMinCredits: 21, balancedNote: '7영역 7과목×3학점=21학점' },
  msc: { minCredits: 30, note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수' },
  major: { totalMinCredits: 60, designMinCredits: 12, mandatoryCourseNames: ['로봇학입문', '캡스톤설계'], mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조' },
  manualChecks: [{ id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' }],
};

const rule_컴퓨터정보공학부_2017_2019: GraduationRule = {
  admissionYears: [2017, 2018, 2019],
  college: '인공지능융합대학',
  department: '컴퓨터정보공학부',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 p.52 (2017-2019학번)',
  lastUpdated: '2025-03-18',
  liberalArts: { mandatoryCredits: 0, mandatoryCourses: [], balancedMinCredits: 21, balancedNote: '7영역 7과목×3학점=21학점' },
  msc: { minCredits: 30, note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수' },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: ['산학협력캡스톤설계'],
    mandatoryNote: '2017-2019학번: 공학설계입문·수치해석은 필수 아님. 산학협력캡스톤설계1 또는 2 중 1과목 이수',
  },
  manualChecks: [{ id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' }],
};

const rule_소프트웨어학부_2017_2019: GraduationRule = {
  admissionYears: [2017, 2018, 2019],
  college: '인공지능융합대학',
  department: '소프트웨어학부',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 p.53 (2017-2019학번)',
  lastUpdated: '2025-03-18',
  liberalArts: { mandatoryCredits: 0, mandatoryCourses: [], balancedMinCredits: 21, balancedNote: '7영역 7과목×3학점=21학점' },
  msc: { minCredits: 12, note: '수학 최소 6학점, 기초과학 최소 3학점 포함하여 총 12학점 이상' },
  major: {
    totalMinCredits: 60,
    designMinCredits: 12,
    mandatoryCourseNames: ['공학설계입문', '이산수학', '산학협력캡스톤설계1', '산학협력캡스톤설계2'],
    mandatoryNote: '산학협력캡스톤설계1 또는 2 중 1과목 이상 이수 필요',
  },
  manualChecks: [{ id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' }],
};

const rule_건축공학과_2017_2019: GraduationRule = {
  admissionYears: [2017, 2018, 2019],
  college: '공과대학',
  department: '건축공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 p.36 (2017-2019학번)',
  lastUpdated: '2025-03-18',
  liberalArts: { mandatoryCredits: 0, mandatoryCourses: [], balancedMinCredits: 21, balancedNote: '7영역 7과목×3학점=21학점' },
  msc: { minCredits: 30, note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수' },
  major: { totalMinCredits: 60, designMinCredits: 9, mandatoryCourseNames: ['공학설계입문'], mandatoryNote: '건축공학과 설계학점은 9학점' },
  manualChecks: [{ id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' }],
};

const rule_화학공학과_2017_2019: GraduationRule = {
  admissionYears: [2017, 2018, 2019],
  college: '공과대학',
  department: '화학공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 p.36-37 (2017-2019학번)',
  lastUpdated: '2025-03-18',
  liberalArts: { mandatoryCredits: 0, mandatoryCourses: [], balancedMinCredits: 21, balancedNote: '7영역 7과목×3학점=21학점' },
  msc: { minCredits: 30, note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수' },
  major: { totalMinCredits: 60, designMinCredits: 12, mandatoryCourseNames: ['공학설계입문', '캡스톤설계심화'], mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조' },
  manualChecks: [{ id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' }],
};

const rule_환경공학과_2017_2019: GraduationRule = {
  admissionYears: [2017, 2018, 2019],
  college: '공과대학',
  department: '환경공학과',
  programType: 'engineering',
  totalCreditsRequired: 133,
  sourceNote: '졸업이수학점 p.37-38 (2017-2019학번)',
  lastUpdated: '2025-03-18',
  liberalArts: { mandatoryCredits: 0, mandatoryCourses: [], balancedMinCredits: 21, balancedNote: '7영역 7과목×3학점=21학점' },
  msc: { minCredits: 30, note: '수학·기초과학·전산학 영역에서 필수과목 포함하여 이수' },
  major: { totalMinCredits: 60, designMinCredits: 12, mandatoryCourseNames: ['공학설계입문', '캡스톤설계', '환경기초실험', '환경공정실험', '환경반응공학'], mandatoryNote: '전공필수 과목 목록은 학과 홈페이지 참조' },
  manualChecks: [{ id: 'engineering_program', title: '공학프로그램 이수 여부', description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요' }],
};

/**
 * 모든 규칙이 등록된 RuleRegistry 인스턴스 생성
 */
export function createRuleRegistry(): RuleRegistry {
  const registry = new RuleRegistry();

  // 2024-2025학번
  registry.registerRule(rule_전자공학과_2024_2025);
  registry.registerRule(rule_전자통신공학과_2024_2025);
  registry.registerRule(rule_전자융합공학과_2024_2025);
  registry.registerRule(rule_전기공학과_2024_2025);
  registry.registerRule(rule_전자재료공학과_2024_2025);
  registry.registerRule(rule_로봇학부_2024_2025);
  registry.registerRule(rule_컴퓨터정보공학부_2024_2025);
  registry.registerRule(rule_소프트웨어학부_2024_2025);
  registry.registerRule(rule_건축공학과_2024_2025);
  registry.registerRule(rule_화학공학과_2024_2025);
  registry.registerRule(rule_환경공학과_2024_2025);

  // 2020-2023학번
  registry.registerRule(rule_전자공학과_2020_2023);
  registry.registerRule(rule_전자통신공학과_2020_2023);
  registry.registerRule(rule_전자융합공학과_2020_2023);
  registry.registerRule(rule_전기공학과_2020_2023);
  registry.registerRule(rule_전자재료공학과_2020_2023);
  registry.registerRule(rule_로봇학부_2020_2023);
  registry.registerRule(rule_컴퓨터정보공학부_2020_2023);
  registry.registerRule(rule_소프트웨어학부_2020_2023);
  registry.registerRule(rule_건축공학과_2020_2023);
  registry.registerRule(rule_화학공학과_2020_2023);
  registry.registerRule(rule_환경공학과_2020_2023);

  // 2017-2019학번
  registry.registerRule(rule_전자공학과_2017_2019);
  registry.registerRule(rule_전자통신공학과_2017_2019);
  registry.registerRule(rule_전자융합공학과_2017_2019);
  registry.registerRule(rule_전기공학과_2017_2019);
  registry.registerRule(rule_전자재료공학과_2017_2019);
  registry.registerRule(rule_로봇학부_2017_2019);
  registry.registerRule(rule_컴퓨터정보공학부_2017_2019);
  registry.registerRule(rule_소프트웨어학부_2017_2019);
  registry.registerRule(rule_건축공학과_2017_2019);
  registry.registerRule(rule_화학공학과_2017_2019);
  registry.registerRule(rule_환경공학과_2017_2019);

  return registry;
}
