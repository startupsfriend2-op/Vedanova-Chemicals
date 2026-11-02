import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // Inner pages predate this config and are intentionally left untouched.
  {
    files: ['app/about/**', 'app/products/**', 'app/industries/**', 'app/contact/**', 'app/privacy/**', 'components/ContactForm.tsx', 'components/Shared.tsx'],
    rules: { 'react/no-unescaped-entities': 'off', 'react-hooks/set-state-in-effect': 'off' },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', '_preview/**', 'scripts/**']),
]);
