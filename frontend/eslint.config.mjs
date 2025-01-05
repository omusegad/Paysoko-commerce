module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime',
    'next/core-web-vitals',
    'next/typescript',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    // Ignore unused variables warning
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_'
    }],

    // Allow `any` type (use cautiously)
    '@typescript-eslint/no-explicit-any': 'off',

    // Disable unused React variables warning
    'react/jsx-uses-react': 'off', // Next.js doesn't require React to be in scope
    'react/jsx-uses-vars': 'off',

    // Ignore the warning for unescaped entities in JSX
    'react/no-unescaped-entities': 'off',

    // Disable hook name rule for custom functions like "onSuccess"
    'react-hooks/rules-of-hooks': 'off',

    // Optionally, you can also silence deprecation warnings
    'no-deprecated-api': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
