import * as readline from 'node:readline';

type KeyPressEvent = {sequence: string, name: string, ctrl: boolean, meta: boolean, shift: boolean};

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
