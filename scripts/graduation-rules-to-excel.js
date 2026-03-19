/**
 * graduation-rules.json → graduation-rules.xlsx 변환 (초기 부트스트랩용)
 * 사용: node scripts/graduation-rules-to-excel.js
 */
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const JSON_PATH = path.resolve(__dirname, '../src/features/graduation-audit/data/graduation-rules.json');
const EXCEL_PATH = path.resolve(__dirname, '../src/features/graduation-audit/data/graduation-rules.xlsx');

const rules = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));

const rows = rules.map(rule => ({
  college: rule.college,
  department: rule.department,
  admissionYearStart: Math.min(...rule.admissionYears),
  admissionYearEnd: Math.max(...rule.admissionYears),
  programType: rule.programType,
  totalCreditsRequired: rule.totalCreditsRequired,
  sourceNote: rule.sourceNote,
  lastUpdated: rule.lastUpdated,
  liberalArts_totalMinCredits: rule.liberalArts.totalMinCredits ?? '',
  liberalArts_mandatoryCredits: rule.liberalArts.mandatoryCredits,
  liberalArts_mandatoryCourses: (rule.liberalArts.mandatoryCourses || []).join(','),
  liberalArts_balancedMinCredits: rule.liberalArts.balancedMinCredits,
  liberalArts_balancedNote: rule.liberalArts.balancedNote || '',
  msc_minCredits: rule.msc.minCredits,
  msc_note: rule.msc.note || '',
  msc_mandatoryCourses: (rule.msc.mandatoryCourses || []).join(','),
  msc_eligibleCourseNames: (rule.msc.eligibleCourseNames || []).join(','),
  major_totalMinCredits: rule.major.totalMinCredits,
  major_designMinCredits: rule.major.designMinCredits,
  major_mandatoryCourseNames: (rule.major.mandatoryCourseNames || []).join(','),
  major_mandatoryGroup1: rule.major.mandatoryCourseGroups && rule.major.mandatoryCourseGroups.length > 0
    ? (rule.major.mandatoryCourseGroups[0].courses || []).join(',')
    : '',
  major_mandatoryNote: rule.major.mandatoryNote || '',
  major_prerequisiteCourses: (rule.major.prerequisiteCourses || []).join(','),
}));

const worksheet = XLSX.utils.json_to_sheet(rows);

// 컬럼 너비 설정
worksheet['!cols'] = [
  { wch: 18 }, // college
  { wch: 22 }, // department
  { wch: 18 }, // admissionYearStart
  { wch: 16 }, // admissionYearEnd
  { wch: 14 }, // programType
  { wch: 20 }, // totalCreditsRequired
  { wch: 35 }, // sourceNote
  { wch: 14 }, // lastUpdated
  { wch: 24 }, // liberalArts_totalMinCredits
  { wch: 26 }, // liberalArts_mandatoryCredits
  { wch: 20 }, // liberalArts_mandatoryCourses
  { wch: 28 }, // liberalArts_balancedMinCredits
  { wch: 30 }, // liberalArts_balancedNote
  { wch: 16 }, // msc_minCredits
  { wch: 40 }, // msc_note
  { wch: 60 }, // msc_mandatoryCourses
  { wch: 80 }, // msc_eligibleCourseNames
  { wch: 22 }, // major_totalMinCredits
  { wch: 20 }, // major_designMinCredits
  { wch: 80 }, // major_mandatoryCourseNames
  { wch: 60 }, // major_mandatoryGroup1
  { wch: 40 }, // major_mandatoryNote
  { wch: 80 }, // major_prerequisiteCourses
];

const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, '졸업규칙');
XLSX.writeFile(workbook, EXCEL_PATH);

console.log(`✅ graduation-rules.xlsx 생성 완료 (${rules.length}개 규칙)`);
console.log(`   경로: ${EXCEL_PATH}`);
