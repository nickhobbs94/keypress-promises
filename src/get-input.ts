import { createInterface } from 'node:readline/promises';

export async function getInput(prompt = ''): Promise<string> {
  const { stdin , stdout} = await import('node:process');
  const rl = createInterface({ input: stdin, output: stdout, terminal: true });
  const result = await rl.question(prompt);
  rl.close();
  return result;
}
