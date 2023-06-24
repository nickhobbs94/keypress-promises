## Installation
Use node 20+
```
npm i keypress-promises
```

## Example usage

```
import { getKey, getInput } from 'keypress-promises';

const key = await getKey();
console.log(key);
// { sequence: 'j', name: 'j', ctrl: false, meta: false, shift: false }
// { sequence: '\x03', name: 'c', ctrl: true, meta: false, shift: false }

const userInput = await getInput('Enter your name: ');
console.log(`Your name is ${userInput}`);
// Your name is nick

```
