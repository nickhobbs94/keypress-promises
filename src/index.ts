import * as readline from 'node:readline';

export type KeyPressEvent = {sequence: string, name: string, ctrl: boolean, meta: boolean, shift: boolean};

export async function getKey(): Promise<KeyPressEvent> {
  const { stdin , stdout} = await import('node:process');
  const rl = readline.promises.createInterface({ input: stdin, output: stdout, terminal: false });
  stdin.setRawMode(true);
  readline.emitKeypressEvents(stdin, rl);

  let listener: (...args: any[]) => void;

  return new Promise(resolve => {
    listener = (k, e) => {
      rl.close();
      stdin.removeListener('keypress', listener);
      resolve(e);
    }
    stdin.on('keypress', listener);
  });
}

export async function getInput(prompt = ''): Promise<string> {
    const { stdin , stdout} = await import('node:process');
    const rl = readline.promises.createInterface({ input: stdin, output: stdout, terminal: true });
    const result = await rl.question(prompt);
    rl.close();
    return result;
}

export type VimCommand = {key: string, amount: number}

export async function getVimCommand (): Promise<VimCommand> {
  let command: Partial<VimCommand> = {key: '', amount: undefined};

  while (true) {
      command.key = (await getKey()).sequence;
      let num = parseInt(command.key);
      if (Number.isNaN(num)) {
          return {
            key: command.key,
            amount: command.amount ?? 1
          };
      }
      command.amount = (command.amount ?? 0) * 10 + num;
  }
}
