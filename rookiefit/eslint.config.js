import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    parser: '@typescript-eslint/parser',  // TypeScript 파서 사용
    extends: [js.configs.recommended, ...tseslint.configs.recommended, 'plugin:@typescript-eslint/recommended',  // TypeScript에 대한 권장 규칙 사용
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/react-in-jsx-scope': 'off', // 1번
      'react/jsx-uses-react': 'off', // 2번
      "no-unused-vars": "off",
      "react/prop-types": "off"
    },
  },
)
