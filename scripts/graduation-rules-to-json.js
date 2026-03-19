/**
 * graduation-rules.xlsx → graduation-rules.json 변환
 * 사용: npm run rules:build  (또는 node scripts/graduation-rules-to-json.js)
 *
 * 워크플로: Excel 편집 → npm run rules:build → JSON 자동 갱신 → npm run build
 */
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const EXCEL_PATH = path.resolve(__dirname, '../src/features/graduation-audit/data/graduation-rules.xlsx');
const JSON_PATH  = path.resolve(__dirname, '../src/features/graduation-audit/data/graduation-rules.json');

if (!fs.existsSync(EXCEL_PATH)) {
  console.error(`❌ Excel 파일을 찾을 수 없습니다: ${EXCEL_PATH}`);
  console.error('   먼저 node scripts/graduation-rules-to-excel.js 를 실행하여 초기 파일을 생성하세요.');
  process.exit(1);
}

const workbook = XLSX.readFile(EXCEL_PATH);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet);

const splitList = (s) =>
  s ? String(s).split(',').map(t => t.trim()).filter(Boolean) : [];

const rules = rows.map((row, i) => {
  const start = Number(row.admissionYearStart);
  const end = Number(row.admissionYearEnd);
  if (isNaN(start) || isNaN(end) || start > end) {
    throw new Error(`행 ${i + 2}: admissionYearStart(${row.admissionYearStart}) 또는 admissionYearEnd(${row.admissionYearEnd}) 오류`);
  }

  const admissionYears = [];
  for (let y = start; y <= end; y++) admissionYears.push(y);

  const rule = {
    admissionYears,
    college: String(row.college || '').trim(),
    department: String(row.department || '').trim(),
    programType: String(row.programType || 'engineering').trim(),
    totalCreditsRequired: Number(row.totalCreditsRequired),
    sourceNote: String(row.sourceNote || '').trim(),
    lastUpdated: String(row.lastUpdated || '').trim(),
    liberalArts: {
      ...(row.liberalArts_totalMinCredits !== undefined && row.liberalArts_totalMinCredits !== '' ? { totalMinCredits: Number(row.liberalArts_totalMinCredits) } : {}),
      mandatoryCredits: Number(row.liberalArts_mandatoryCredits ?? 0),
      mandatoryCourses: splitList(row.liberalArts_mandatoryCourses),
      balancedMinCredits: Number(row.liberalArts_balancedMinCredits),
      ...(row.liberalArts_balancedNote ? { balancedNote: String(row.liberalArts_balancedNote).trim() } : {}),
    },
    msc: {
      minCredits: Number(row.msc_minCredits),
      ...(row.msc_note ? { note: String(row.msc_note).trim() } : {}),
      ...(row.msc_mandatoryCourses ? { mandatoryCourses: splitList(row.msc_mandatoryCourses) } : {}),
      ...(row.msc_eligibleCourseNames ? { eligibleCourseNames: splitList(row.msc_eligibleCourseNames) } : {}),
    },
    major: {
      totalMinCredits: Number(row.major_totalMinCredits),
      designMinCredits: Number(row.major_designMinCredits),
      mandatoryCourseNames: splitList(row.major_mandatoryCourseNames),
      ...(row.major_mandatoryGroup1 ? { mandatoryCourseGroups: [{ type: 'oneOf', courses: splitList(row.major_mandatoryGroup1), minCount: 1 }] } : {}),
      ...(row.major_mandatoryNote ? { mandatoryNote: String(row.major_mandatoryNote).trim() } : {}),
      ...(row.major_prerequisiteCourses ? { prerequisiteCourses: splitList(row.major_prerequisiteCourses) } : {}),
    },
    manualChecks: [
      {
        id: 'engineering_program',
        title: '공학프로그램 이수 여부',
        description: '공학 교육인증 프로그램으로 졸업하는 경우 해당 요건 확인 필요',
      },
    ],
  };

  if (!rule.college || !rule.department) {
    throw new Error(`행 ${i + 2}: college 또는 department가 비어있습니다.`);
  }

  return rule;
});

fs.writeFileSync(JSON_PATH, JSON.stringify(rules, null, 2), 'utf-8');
console.log(`✅ graduation-rules.json 생성 완료 (${rules.length}개 규칙)`);
