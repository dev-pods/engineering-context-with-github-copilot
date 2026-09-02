export function parsePromptFrontmatter(content: string): Record<string, string> | null;

export function collectStepErrors(step: number, root?: string): string[];