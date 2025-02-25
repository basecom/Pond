// temporary workaround until https://github.com/vuejs/language-tools/issues/4249 is solved
// otherwise, we will receive issues from node_modules/@shopware-pwa

import Bun from 'bun';

type stringString = string[][]

const proc = Bun.spawn(['bun', 'run', 'vue-tsc', '--noEmit']);
const text = await new Response(proc.stdout).text();

let chunks: stringString = [];
let chunkIndex = -1;

for(const line of text.split('\n')) {
    if(line.includes('error TS')) {
        chunkIndex++;
    }

    chunks[chunkIndex] ??= [];
    chunks[chunkIndex]?.push(line);
}

chunks = chunks.filter(chunk => !chunk[0]?.includes('shopware-pwa'));
chunks.forEach(chunk => {
    chunk.forEach((line, index) => {
        if(index === 0) {
            console.log(`\x1b[31m${line}\x1b[0m`);
            return;
        }
        console.log(line);
    });
    console.log('');
});

process.exit(chunks.length > 1 ? 1 : 0);
