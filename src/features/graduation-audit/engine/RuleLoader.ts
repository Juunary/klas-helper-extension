/**
 * 졸업 규칙 JSON 로더
 * app.js는 page context에 <script> 태그로 주입되므로 fetch 대신 webpack 번들에 직접 포함
 */

import type { GraduationRule } from './types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rulesData = require('../data/graduation-rules.json') as GraduationRule[];

export async function loadGraduationRules(): Promise<GraduationRule[]> {
  return rulesData;
}
