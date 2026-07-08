import { cp, mkdir, rm } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const dist = new URL('../dist/', import.meta.url);

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const file of ['index.html', 'styles.css', 'script.js', 'video.js', 'lead-capture.php']) {
  await cp(new URL(`../${file}`, import.meta.url), new URL(`../dist/${file}`, import.meta.url));
}

await cp(new URL('../public/', import.meta.url), new URL('../dist/public/', import.meta.url), {
  recursive: true,
});

await mkdir(new URL('../dist/storage/', import.meta.url), { recursive: true });
await cp(new URL('../storage/.htaccess', import.meta.url), new URL('../dist/storage/.htaccess', import.meta.url));

console.log('Build estático criado em dist/.');
