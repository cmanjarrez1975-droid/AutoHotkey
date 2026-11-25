import { spawn } from 'node:child_process';
import { readFile, mkdir, open, unlink } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);
process.env.WRANGLER_LOG_PATH ??= '.wrangler/wrangler.log';
if (process.argv[2] === 'dev') process.env.ACADEMY_LOCAL_MODE = '1';
const command = process.argv[2];
async function run(script, args = [], timeout = 240000) {
  await new Promise((ok, fail) => {
    const child = spawn(process.execPath, [resolve(root, script), ...args], {
      cwd: root, stdio: 'inherit', env: process.env, windowsHide: true,
    });
    const timer = timeout ? setTimeout(() => child.kill(), timeout) : null;
    child.on('error', fail);
    child.on('exit', code => { if (timer) clearTimeout(timer); if (code === 0) ok(); else fail(new Error(`Proceso finalizado con código ${code}`)); });
  });
}
async function validate() {
  JSON.parse(await readFile('dist/.openai/hosting.json', 'utf8'));
  const { default: worker } = await import(pathToFileURL(resolve('dist/server/index.js')).href);
  if (typeof worker?.fetch !== 'function') throw new Error('Falta default.fetch en el Worker');
  console.log('Artefacto Sites verificado.');
}
try {
  if (command === 'dev') await run('node_modules/vite/bin/vite.js', ['--host', '127.0.0.1'], 0);
  else if (command === 'build') { await run('node_modules/vinext/dist/cli.js', ['build']); await validate(); }
  else if (command === 'start') await run('node_modules/vinext/dist/cli.js', ['start'], 0);
  else if (command === 'validate') await validate();
  else if (command === 'lint') await run('node_modules/eslint/bin/eslint.js', ['.', '--ignore-pattern', 'dist', '--ignore-pattern', '.next']);
  else if (command === 'db:generate') await run('node_modules/drizzle-kit/bin.cjs', ['generate']);
  else if (command === 'db:local') {
    // An explicit local-only command; never imports the production backup.
    await mkdir('.sites-runtime', { recursive: true });
    const config = { name: 'academy-local', compatibility_date: '2026-08-01', d1_databases: [{ binding: 'DB', database_name: 'site-creator-d1', database_id: '00000000-0000-4000-8000-000000000000', migrations_dir: '../drizzle' }] };
    await import('node:fs/promises').then(fs => fs.writeFile('.sites-runtime/wrangler.local.json', JSON.stringify(config)));
    await run('node_modules/wrangler/bin/wrangler.js', ['d1', 'migrations', 'apply', 'DB', '--local', '--config', '.sites-runtime/wrangler.local.json', '--persist-to', '.wrangler/state']);
  } else if (command === 'install') {
    await mkdir('.sites-runtime', { recursive: true });
    const lockPath = '.sites-runtime/install.lock';
    const lock = await open(lockPath, 'wx');
    try { if (!process.env.npm_execpath) throw new Error('Ejecutar mediante npm run install:ci'); await run(process.env.npm_execpath, ['ci'], 600000); }
    finally { await lock.close(); await unlink(lockPath); }
  } else if (command === 'backup-local') {
    const fs = await import('node:fs/promises');
    const target = resolve('.sites-runtime', `backup-${Date.now()}`);
    await fs.cp('.wrangler/state', target, { recursive: true, errorOnExist: true, force: false });
    console.log(`Respaldo local: ${target}`);
  } else throw new Error(`Comando desconocido: ${command}`);
} catch (error) { console.error(error.message); process.exitCode = 1; }
