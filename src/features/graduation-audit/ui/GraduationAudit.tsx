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
  Tag,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { GraduationAuditEngine } from '../engine/RuleEngine';
import { collectStudentData } from '../engine/StudentDataCollector';
import type { AuditResult, RequirementResult } from '../engine/types';

interface GraduationAuditProps {
  onClose?: () => void;
}

const GraduationAudit: React.FC<GraduationAuditProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);

  useEffect(() => {
    // 규칙들을 로드하고 심사 실행
    const runAudit = async () => {
      try {
        setLoading(true);

        // 규칙 로드 (TypeScript 상수에서)
        const { createRuleRegistry } = await import('../engine/RuleRegistry');
        const ruleRegistry = createRuleRegistry();

        // 학생 데이터 수집 (실패 시 collectStudentData 내부에서 throw)
        const studentData = collectStudentData();

        // 심사 실행
        const engine = new GraduationAuditEngine(ruleRegistry);
        const auditResult = engine.auditStudent(studentData);
        setResult(auditResult);
      }
      catch (err) {
        const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
        setError(message);
      }
      finally {
        setLoading(false);
      }
    };

    runAudit();
  }, []);

  if (loading) {
    return (
      <Card style={{ marginTop: '20px' }}>
        <Spin size="large" tip="졸업 심사 중..." />
      </Card>
    );
  }

  if (error) {
    return (
      <Card style={{ marginTop: '20px' }}>
        <Alert
          message="오류 발생"
          description={error}
          type="error"
          showIcon
          action={
            onClose && (
              <Button size="small" danger onClick={onClose}>
                닫기
              </Button>
            )
          }
        />
      </Card>
    );
  }

  if (!result) {
    return <Empty description="결과를 불러올 수 없습니다." />;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '20px' }} />;
      case 'fail':
        return <CloseCircleOutlined style={{ color: '#f5222d', fontSize: '20px' }} />;
      case 'manual':
        return <QuestionCircleOutlined style={{ color: '#faad14', fontSize: '20px' }} />;
      default:
        return null;
    }
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'pass':
        return <Tag color="success">충족</Tag>;
      case 'fail':
        return <Tag color="error">미충족</Tag>;
      case 'manual':
        return <Tag color="warning">수동확인</Tag>;
      default:
        return null;
    }
  };

  const getOverallStatusColor = (status: string) => {
    switch (status) {
      case 'eligible':
        return 'success';
      case 'ineligible':
        return 'error';
      case 'pending':
        return 'warning';
      case 'unregistered':
        return 'default';
      default:
        return 'default';
    }
  };

  const getOverallStatusText = (status: string) => {
    switch (status) {
      case 'eligible':
        return '졸업 가능';
      case 'ineligible':
        return '졸업 불가능';
      case 'pending':
        return '미충족 항목 있음';
      case 'unregistered':
        return '규정 미등록';
      default:
        return '미정';
    }
  };

  const requirementItems = result.requirements.map((req) => ({
    key: req.id,
    label: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Space>
          {getStatusIcon(req.status)}
          <span>{req.title}</span>
        </Space>
        <div style={{ marginRight: '20px' }}>
          {req.status === 'pass' ? (
            <Tag color="success">충족</Tag>
          ) : req.status === 'fail' ? (
            <Tag color="error">미충족</Tag>
          ) : (
            <Tag color="warning">수동확인</Tag>
          )}
        </div>
      </div>
    ),
    children: (
      <div>
        <p>
          <strong>{req.title}</strong>
        </p>
        <p>
          상태:
          {req.detail}
        </p>
        {req.missing && (
          <div style={{ marginTop: '10px' }}>
            <p style={{ color: '#f5222d' }}>
              <strong>부족 항목:</strong>
            </p>
            <ul>
              {req.missing.items?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            {req.missing.credits && (
              <p>
                부족 학점:
                {req.missing.credits}
                학점
              </p>
            )}
          </div>
        )}
        {req.sourceNote && (
          <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
            근거:
            {' '}
            {req.sourceNote}
          </p>
        )}
      </div>
    ),
  }));

  return (
    <div style={{ padding: '20px' }}>
      <Card
        title={(
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>졸업 심사 결과</span>
            {onClose && (
              <Button type="text" size="small" onClick={onClose}>
                닫기
              </Button>
            )}
          </div>
        )}
        style={{ marginBottom: '20px' }}
      >
        {/* 기본 정보 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
          <Col xs={24}>
            <p>
              <strong>학번:</strong>
              {' '}
              {result.studentId}
            </p>
            <p>
              <strong>입학년도:</strong>
              {' '}
              {result.admissionYear}
            </p>
            <p>
              <strong>단과대/학과:</strong>
              {' '}
              {result.college}
              {' '}
              {result.department}
            </p>
            {result.appliedRule && (
              <p>
                <strong>적용 규정:</strong>
                {' '}
                {result.appliedRule.sourceNote}
              </p>
            )}
          </Col>
        </Row>

        <Divider />

        {/* 전체 상태 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
          <Col xs={24} sm={12}>
            <div style={{ textAlign: 'center' }}>
              <h3>전체 상태</h3>
              <Tag
                color={getOverallStatusColor(result.overallStatus)}
                style={{ padding: '8px 16px', fontSize: '16px' }}
              >
                {getOverallStatusText(result.overallStatus)}
              </Tag>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div>
              <p>
                <strong>진행률:</strong>
              </p>
              <Progress
                percent={result.totalCompletionRate}
                status={
                  result.overallStatus === 'eligible'
                    ? 'success'
                    : result.overallStatus === 'ineligible'
                      ? 'exception'
                      : 'normal'
                }
              />
              <p style={{ marginTop: '10px', color: '#666', fontSize: '12px' }}>
                {result.totalCompletionRate}
                % 완료
              </p>
            </div>
          </Col>
        </Row>

        {result.remark && (
          <Alert
            message={result.remark}
            type={result.overallStatus === 'pending' ? 'warning' : 'info'}
            style={{ marginBottom: '20px' }}
            showIcon
          />
        )}
      </Card>

      {/* 요건별 상세 */}
      {result.requirements.length > 0 && (
        <Card title="요건별 상세 현황">
          <Collapse
            items={requirementItems}
            defaultActiveKey={
              // 미충족된 항목을 기본으로 펼친다
              result.requirements
                .filter((r) => r.status !== 'pass')
                .map((r) => r.id)
            }
          />
        </Card>
      )}

      {result.appliedRule?.manualChecks && result.appliedRule.manualChecks.length > 0 && (
        <Card title="수동 확인 필요 항목" style={{ marginTop: '20px' }}>
          {result.appliedRule.manualChecks.map((check) => (
            <Alert
              key={check.id}
              message={check.title}
              description={check.description}
              type="info"
              icon={<QuestionCircleOutlined />}
              style={{ marginBottom: '10px' }}
            />
          ))}
        </Card>
      )}

      {result.overallStatus === 'unregistered' && (
        <Card title="규정 미등록" style={{ marginTop: '20px' }}>
          <Alert
            message="이 학과의 규정이 아직 등록되지 않았습니다."
            description={(
              <>
                <p>학교 공식 졸업요건 문서를 확인하시거나 학과 사무실에 문의하시기 바랍니다.</p>
                <a href="https://github.com/kw-service/klas-helper-extension" target="_blank" rel="noopener noreferrer">
                  GitHub에서 규칙 추가 제안하기
                </a>
              </>
            )}
            type="warning"
            showIcon
          />
        </Card>
      )}
    </div>
  );
};

export default GraduationAudit;
