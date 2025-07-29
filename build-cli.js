import { build } from 'esbuild';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

build({
  entryPoints: [join(__dirname, 'src/cli.ts')],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: join(__dirname, 'dist/cli.js'),
  format: 'esm',
  external: ['commander'],
}).catch(() => process.exit(1)); 