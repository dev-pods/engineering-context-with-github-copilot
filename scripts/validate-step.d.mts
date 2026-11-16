export function parseSkillFrontmatter(content: string): Record<string, string> | null;

export function collectStepErrors(step: number, root?: string): string[];