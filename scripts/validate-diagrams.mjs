import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';

// Mermaid's parser sanitizes labels through DOMPurify, which needs a DOM in Node.
const dom = new JSDOM('');
globalThis.window = dom.window;
globalThis.document = dom.window.document;
const { default: mermaid } = await import('mermaid');
mermaid.initialize({ startOnLoad: false, securityLevel: 'strict' });

async function validate(directory) {
  let count = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) {
      count += await validate(file);
    } else if (entry.name.endsWith('.mdx')) {
      const text = await readFile(file, 'utf8');
      for (const [, chart] of text.matchAll(/```mermaid\s*\n([\s\S]*?)```/g)) {
        try {
          await mermaid.parse(chart);
        } catch (error) {
          throw new Error(`Invalid Mermaid in ${file}`, { cause: error });
        }
        count++;
      }
    }
  }
  return count;
}

try {
  console.log(`Validated ${await validate('content/docs')} Mermaid diagrams.`);
} finally {
  dom.window.close();
}
