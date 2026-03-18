/**
 * 졸업 심사 React 컴포넌트
 * Ant Design을 사용하여 심사 결과를 표시한다.
 */

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Empty,
  Progress,
  Row,
  Space,
  Spin,
  Switch,
  Tag,
  Typography,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { GraduationAuditEngine } from '../engine/RuleEngine';
import { collectStudentData } from '../engine/StudentDataCollector';
import type { AuditResult, RequirementResult, StudentCourse } from '../engine/types';

const { Text } = Typography;

interface GraduationAuditProps {
  onClose?: () => void;
}

// 성적 → 색상 매핑
const gradeColor = (grade: string) => {
  if (grade.startsWith('A')) return '#52c41a';
  if (grade.startsWith('B')) return '#1890ff';
  if (grade.startsWith('C')) return '#faad14';
  if (grade.startsWith('D')) return '#fa8c16';
  if (grade === 'F' || grade === 'NP') return '#f5222d';
  return '#666';
};

/** 과목 목록 테이블 */
const CourseTable: React.FC<{ courses: StudentCourse[]; emptyText?: string }> = ({ courses, emptyText }) => {
  if (courses.length === 0) {
    return <Text type="secondary" style={{ fontSize: 12 }}>{emptyText ?? '해당 과목 없음'}</Text>;
  }

  // 학기 오름차순 정렬
  const sorted = [...courses].sort((a, b) => a.year !== b.year ? a.year - b.year : a.semester - b.semester);

  return (
    <div style={{ overflowX: 'auto', marginTop: 8 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
            <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: 600, color: '#555' }}>과목명</th>
            <th style={{ padding: '6px 8px', textAlign: 'center', fontWeight: 600, color: '#555', whiteSpace: 'nowrap' }}>이수구분</th>
            <th style={{ padding: '6px 8px', textAlign: 'center', fontWeight: 600, color: '#555', whiteSpace: 'nowrap' }}>학점</th>
            <th style={{ padding: '6px 8px', textAlign: 'center', fontWeight: 600, color: '#555', whiteSpace: 'nowrap' }}>성적</th>
            <th style={{ padding: '6px 8px', textAlign: 'center', fontWeight: 600, color: '#555', whiteSpace: 'nowrap' }}>학기</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((c, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '5px 8px' }}>{c.name}</td>
              <td style={{ padding: '5px 8px', textAlign: 'center' }}>
                <Tag style={{ margin: 0 }}>{c.classification}</Tag>
              </td>
              <td style={{ padding: '5px 8px', textAlign: 'center' }}>{c.credits}학점</td>
              <td style={{ padding: '5px 8px', textAlign: 'center' }}>
                <span style={{ fontWeight: 700, color: gradeColor(c.grade) }}>{c.grade}</span>
              </td>
              <td style={{ padding: '5px 8px', textAlign: 'center', whiteSpace: 'nowrap', color: '#888' }}>
                {c.year}-{c.semester}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/** 전공필수 / 교양필수 체크리스트 */
const MandatoryChecklist: React.FC<{
  required: string[];
  matched: StudentCourse[];
}> = ({ required, matched }) => {
  if (required.length === 0) {
    return <Text type="secondary" style={{ fontSize: 12 }}>해당 입학년도는 필수 과목 없음</Text>;
  }

  return (
    <div style={{ marginTop: 8 }}>
      {required.map((name) => {
        const found = matched.find((c) => {
          const n1 = c.name.trim().toLowerCase();
          const n2 = name.trim().toLowerCase();
          return n1 === n2 || n1.includes(n2) || n2.includes(n1);
        });
        return (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 12 }}>
            {found
              ? <CheckCircleOutlined style={{ color: '#52c41a', flexShrink: 0 }} />
              : <CloseCircleOutlined style={{ color: '#f5222d', flexShrink: 0 }} />}
            <span style={{ minWidth: 140, fontWeight: 500 }}>{name}</span>
            {found
              ? <Text type="secondary">{found.name} ({found.credits}학점, <span style={{ color: gradeColor(found.grade) }}>{found.grade}</span>, {found.year}-{found.semester})</Text>
              : <Text type="danger">미이수</Text>}
          </div>
        );
      })}
    </div>
  );
};

/** 요건 카드 내 상세 내용 */
const RequirementDetail: React.FC<{ req: RequirementResult; rule: { major: { mandatoryCourseNames: string[] }; liberalArts: { mandatoryCourses: string[] } } | null }> = ({ req, rule }) => {
  const isMandatory = req.id === 'mandatory_courses' || req.id === 'liberal_arts_mandatory';

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <Text style={{ fontSize: 13 }}>{req.detail}</Text>
        {req.sourceNote && (
          <Text type="secondary" style={{ fontSize: 11, marginLeft: 8 }}>({req.sourceNote})</Text>
        )}
      </div>

      {isMandatory && rule ? (
        <MandatoryChecklist
          required={req.id === 'mandatory_courses' ? rule.major.mandatoryCourseNames : rule.liberalArts.mandatoryCourses}
          matched={req.matchedCourses ?? []}
        />
      ) : (
        <>
          {req.missing && req.missing.items.length > 0 && (
            <Alert
              type="error"
              message={`미이수 필수 과목: ${req.missing.items.join(', ')}`}
              style={{ marginBottom: 8, fontSize: 12 }}
            />
          )}
          <CourseTable
            courses={req.matchedCourses ?? []}
            emptyText="이수한 해당 과목 없음"
          />
        </>
      )}
    </div>
  );
};

const GraduationAudit: React.FC<GraduationAuditProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [excludeCurrentSemester, setExcludeCurrentSemester] = useState(false);

  const runAudit = useCallback(async (exclude: boolean) => {
    try {
      setLoading(true);
      setError(null);

      const { createRuleRegistry } = await import('../engine/RuleRegistry');
      const ruleRegistry = createRuleRegistry();
      const studentData = collectStudentData();
      const engine = new GraduationAuditEngine(ruleRegistry);
      const auditResult = engine.auditStudent(studentData, { excludeCurrentSemester: exclude });
      setResult(auditResult);
    }
    catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    }
    finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    runAudit(excludeCurrentSemester);
  }, [runAudit, excludeCurrentSemester]);

  if (loading) {
    return (
      <Card style={{ marginTop: 20 }}>
        <div style={{ textAlign: 'center', padding: 32 }}>
          <Spin size="large" />
          <div style={{ marginTop: 12, color: '#666' }}>졸업 심사 중...</div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card style={{ marginTop: 20 }}>
        <Alert
          message="오류 발생"
          description={error}
          type="error"
          showIcon
          action={onClose && <Button size="small" danger onClick={onClose}>닫기</Button>}
        />
      </Card>
    );
  }

  if (!result) {
    return <Empty description="결과를 불러올 수 없습니다." />;
  }

  const getStatusIcon = (status: string) => {
    if (status === 'pass') return <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 18 }} />;
    if (status === 'fail') return <CloseCircleOutlined style={{ color: '#f5222d', fontSize: 18 }} />;
    return <QuestionCircleOutlined style={{ color: '#faad14', fontSize: 18 }} />;
  };

  const getStatusTag = (status: string) => {
    if (status === 'pass') return <Tag color="success">충족</Tag>;
    if (status === 'fail') return <Tag color="error">미충족</Tag>;
    return <Tag color="warning">수동확인</Tag>;
  };

  const overallColor = { eligible: 'success', ineligible: 'error', pending: 'warning', unregistered: 'default' }[result.overallStatus] as 'success' | 'error' | 'warning' | 'default';
  const overallText = { eligible: '졸업 가능', ineligible: '졸업 불가능', pending: '일부 미충족', unregistered: '규정 미등록' }[result.overallStatus];

  const requirementItems = result.requirements.map((req) => ({
    key: req.id,
    label: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Space>
          {getStatusIcon(req.status)}
          <span style={{ fontWeight: 500 }}>{req.title}</span>
          {req.earned !== undefined && req.required !== undefined && (
            <Text type="secondary" style={{ fontSize: 12 }}>
              ({req.earned}{req.id.includes('credits') ? '학점' : '과목'} / {req.required}{req.id.includes('credits') ? '학점' : '과목'})
            </Text>
          )}
        </Space>
        <div style={{ marginRight: 20 }}>{getStatusTag(req.status)}</div>
      </div>
    ),
    children: (
      <RequirementDetail
        req={req}
        rule={result.appliedRule}
      />
    ),
  }));

  return (
    <div style={{ padding: 20 }}>
      {/* 헤더 카드 */}
      <Card
        title={(
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>졸업 심사 결과</span>
            {onClose && <Button type="text" size="small" onClick={onClose}>닫기</Button>}
          </div>
        )}
        style={{ marginBottom: 16 }}
      >
        {/* 학생 정보 */}
        <Row gutter={[16, 4]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12}>
            <Text><strong>학번:</strong> {result.studentId}</Text><br />
            <Text><strong>입학년도:</strong> {result.admissionYear}</Text><br />
            <Text><strong>단과대/학과:</strong> {result.college} {result.department}</Text>
          </Col>
          <Col xs={24} sm={12}>
            {result.appliedRule && (
              <Text type="secondary" style={{ fontSize: 12 }}>
                <strong>적용 규정:</strong> {result.appliedRule.sourceNote}
              </Text>
            )}
            {result.currentSemester && (
              <div style={{ marginTop: 4 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  <strong>최신 학기:</strong> {result.currentSemester.year}년 {result.currentSemester.semester}학기
                </Text>
              </div>
            )}
          </Col>
        </Row>

        {/* 현재 학기 포함/제외 토글 */}
        <div style={{ marginBottom: 16, padding: '10px 12px', backgroundColor: '#f6f8fa', borderRadius: 6, border: '1px solid #e8e8e8', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Switch
            checked={excludeCurrentSemester}
            onChange={(v) => setExcludeCurrentSemester(v)}
            size="small"
          />
          <div>
            <Text style={{ fontSize: 13, fontWeight: 500 }}>
              {excludeCurrentSemester ? '최근 학기 제외' : '최근 학기 포함'}
            </Text>
            {excludeCurrentSemester
              ? result.excludedSemester && (
                <Text type="secondary" style={{ fontSize: 12, marginLeft: 6 }}>
                  ({result.excludedSemester.year}년 {result.excludedSemester.semester}학기 제외됨)
                </Text>
              )
              : result.currentSemester && (
                <Text type="secondary" style={{ fontSize: 12, marginLeft: 6 }}>
                  (최신학기: {result.currentSemester.year}년 {result.currentSemester.semester}학기)
                </Text>
              )
            }
          </div>
          <Text type="secondary" style={{ fontSize: 11, marginLeft: 'auto' }}>
            성적이 미확정인 경우 제외하고 계산
          </Text>
        </div>

        <Divider style={{ margin: '12px 0' }} />

        {/* 전체 상태 + 진행률 */}
        <Row gutter={[24, 16]}>
          <Col xs={24} sm={8} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>전체 상태</div>
            <Tag color={overallColor} style={{ padding: '6px 16px', fontSize: 15, fontWeight: 700 }}>
              {overallText}
            </Tag>
          </Col>
          <Col xs={24} sm={16}>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>
              요건 충족률 ({result.requirements.filter((r) => r.status === 'pass').length} / {result.requirements.length})
            </div>
            <Progress
              percent={result.totalCompletionRate}
              status={result.overallStatus === 'eligible' ? 'success' : result.overallStatus === 'ineligible' ? 'exception' : 'normal'}
              strokeWidth={10}
            />
          </Col>
        </Row>

        {result.remark && (
          <Alert message={result.remark} type="warning" showIcon style={{ marginTop: 12 }} />
        )}
      </Card>

      {/* 요건별 상세 */}
      {result.requirements.length > 0 && (
        <Card title="요건별 상세 현황" style={{ marginBottom: 16 }}>
          <Collapse
            items={requirementItems}
            defaultActiveKey={result.requirements.filter((r) => r.status !== 'pass').map((r) => r.id)}
          />
        </Card>
      )}

      {/* 수동 확인 항목 */}
      {result.appliedRule?.manualChecks && result.appliedRule.manualChecks.length > 0 && (
        <Card title="수동 확인 필요 항목" style={{ marginBottom: 16 }}>
          {result.appliedRule.manualChecks.map((check) => (
            <Alert
              key={check.id}
              message={check.title}
              description={check.description}
              type="info"
              icon={<QuestionCircleOutlined />}
              showIcon
              style={{ marginBottom: 8 }}
            />
          ))}
        </Card>
      )}

      {/* 규정 미등록 */}
      {result.overallStatus === 'unregistered' && (
        <Card title="규정 미등록">
          <Alert
            message="이 학과의 규정이 아직 등록되지 않았습니다."
            description="학교 공식 졸업요건 문서를 확인하시거나 학과 사무실에 문의하시기 바랍니다."
            type="warning"
            showIcon
          />
        </Card>
      )}
    </div>
  );
};

export default GraduationAudit;
