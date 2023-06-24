import { getKey } from "./get-key";

type VimCommand = {key: string, amount: number}

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
