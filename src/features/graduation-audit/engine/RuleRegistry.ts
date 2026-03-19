/**
 * 졸업 요건 규칙 레지스트리
 * 규칙은 graduation-rules.json에서 런타임에 로드된다.
 * 편집: graduation-rules.xlsx → npm run rules:build → graduation-rules.json
 */

import { RuleRegistry } from './RuleEngine';
import { loadGraduationRules } from './RuleLoader';

/**
 * 모든 규칙이 등록된 RuleRegistry 인스턴스 생성
 * JSON 파일에서 비동기로 규칙을 로드한다.
 */
export async function createRuleRegistry(): Promise<RuleRegistry> {
  const rules = await loadGraduationRules();
  const registry = new RuleRegistry();
  for (const rule of rules) {
    registry.registerRule(rule);
  }
  return registry;
}
