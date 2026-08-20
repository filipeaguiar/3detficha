import { build } from 'vite';
import { rmSync } from 'node:fs';

async function run() {
  await build({
    configFile: false,
    build: {
      ssr: 'src/tests/actionResolver.test.ts',
      outDir: '.tmp_test',
      emptyOutDir: true,
      target: 'node20',
      rollupOptions: {
        output: {
          entryFileNames: 'testBundle.mjs',
          format: 'es',
        },
      },
    },
  });

  const { runActionResolverTests } = await import('../.tmp_test/testBundle.mjs');
  const result = runActionResolverTests();
  try {
    rmSync('.tmp_test', { recursive: true, force: true });
  } catch {
    // Ignore cleanup error
  }
  if (result.failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
